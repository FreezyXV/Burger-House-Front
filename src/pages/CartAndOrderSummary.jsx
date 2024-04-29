import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/summary.css";

// Ce Composant est le Panier du Site
const CartAndOrderSummary = ({
  cartItems,
  onRemoveItemFromCart,
  onSuccess,
}) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [itemsWithImages, setItemsWithImages] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

async function getItemById(type, id) {
    var response = null;
  
    if (type === "Menu") {
      response = await fetch(`http://localhost:2233/api/menus/${id}`);
    } else {
      response = await fetch(`http://localhost:2233/api/products/${id}`);
    }
  
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
  
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }

  //Cette fonction s'assure que les informations de l'utilisateur dans l'application sont à jour. Il écoute si l'utilisateur se connecte ou se déconnecte et met à jour ces informations automatiquement.
  useEffect(() => {
    const handleLoginStateChange = (event) => {
      setUser(event.detail);
    };

    window.addEventListener("loginStateChanged", handleLoginStateChange);

    return () => {
      window.removeEventListener("loginStateChanged", handleLoginStateChange);
    };
  }, []);

  useEffect(() => {
    if (!cartItems.length) {
      setIsLoading(false);
      return;
    }

    // Lié au toggleExpand, permet d'afficher les images des divers produits séléctionés(Options)
    const fetchItemImages = async () => {
      try {
        const updatedItemsWithImages = await Promise.all(
          cartItems.map(async (cartItem) => {
            const itemDetails = await getItemById(
              cartItem.onModel,
              cartItem.itemRef
            );
            if (cartItem.onModel === "Menu" && cartItem.selectedOptions) {
              const optionIds = Object.values(cartItem.selectedOptions).filter(
                (id) => /^[0-9a-fA-F]{24}$/.test(id)
              );
              const optionsDetails = await Promise.all(
                optionIds.map((id) => getItemById("Product", id))
              );
              return {
                ...cartItem,
                ...itemDetails,
                selectedOptions: optionsDetails.reduce(
                  (detailsObj, detail, index) => ({
                    ...detailsObj,
                    [optionIds[index]]: detail,
                  }),
                  {}
                ),
              };
            }
            return { ...cartItem, ...itemDetails };
          })
        );
        setItemsWithImages(updatedItemsWithImages);
      } catch (error) {
        console.error("Error fetching item images and details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemImages();
  }, [cartItems]);

  //Gère le processus de soumission de commande. Vérifie si le panier n'est pas vide et si les informations utilisateur sont complètes, prépare les données de la commande, et gère la soumission via `submitOrder`. En cas de succès, nettoie le panier, sauvegarde la commande, et redirige l'utilisateur vers la page de confirmation de commande.
  const handleOrderSubmission = async () => {
    if (!itemsWithImages.length) {
      alert("No items in cart.");
      return;
    }
    if (!user || !user.name || !user.email) {
      alert("Please complete your profile before placing an order.");
      return;
    }

    const orderPayload = {
      customer: user,
      items: itemsWithImages.map((item) => ({
        itemRef: item._id,
        onModel: item.onModel,
        quantity: item.quantity,
        selectedOptions: item.selectedOptions,
      })),
      totalPrice: calculateTotalPrice(),
    };

    try {
      const response = await submitOrder(orderPayload);
      localStorage.setItem("lastOrder", JSON.stringify(response));
      clearCart();
      onSuccess();
      navigate("/orderconfirmation", {
        state: { message: "Your order has been placed successfully!" },
      });
    } catch (error) {
      alert(`Failed to submit order: ${error.message}`);
    }
  };

  //Soumet la commande au serveur. Envoie les détails de la commande via une requête POST à l'API du backend. Gère la réponse du serveur, y compris le traitement des erreurs de réseau ou des réponses HTTP non satisfaisantes.
  const submitOrder = async (orderDetails) => {
    const url = "http://localhost:2233/api/orders/add/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(orderDetails),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to submit order: ${responseData.message || "Unknown error"}`
        );
      }

      return responseData;
    } catch (error) {
      console.error("Error submitting order:", error);

      throw error;
    }
  };

  // Fonction qui permet de vider le contenu du Panier dans le LocalStorage une fois la Commande Passée
  const clearCart = () => {
    setItemsWithImages([]);
    localStorage.removeItem("cartItems");
  };

  // Fonction qui permet de dévoiler la liste des selections faites par l'utilisateur dans le Menu
  const toggleExpand = (id) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  // Fonction qui calcule le prix Total du Panier
  const calculateTotalPrice = () => {
    return itemsWithImages.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Votre Commande</h2>
      {itemsWithImages.length > 0 ? (
        itemsWithImages.map((item, index) => (
          <div key={index} className="cart-item">
            <figure className="img-box">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="item-image"
              />
            </figure>
            <div className="item-details">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-quantity">Quantité : {item.quantity}</p>
              <p className="item-price">Prix : €{item.price?.toFixed(2)}</p>
              {item.onModel === "Menu" && (
                <>
                  <button
                    onClick={() => toggleExpand(item._id)}
                    className="toggle-menu-details"
                  >
                    {expandedMenus[item._id] ? "↑" : "↓"}
                  </button>
                  {item.selectedOptions && (
                    <div
                      className={`selected-options ${
                        expandedMenus[item._id] ? "expanded" : ""
                      }`}
                    >
                      {Object.entries(item.selectedOptions).map(
                        ([optionId, details]) => (
                          <div
                            key={optionId}
                            className="selected-option-detail"
                          >
                            <img
                              src={details.imageSrc}
                              alt={details.title}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <span>{details.title}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      navigate(`/menu/${item.itemRef}?modify=true`, {
                        state: {
                          isModifying: true,
                          menuDetails: item,
                        },
                      });
                    }}
                    className="modify-menu"
                  >
                    Modifiez votre menu
                  </button>
                </>
              )}
              <button
                className="remove-item"
                onClick={() => {
                  onRemoveItemFromCart(item.uniqueId);
                  setItemsWithImages((prevItems) =>
                    prevItems.filter((i) => i.uniqueId !== item.uniqueId)
                  );
                }}
              >
                Enlever du Panier
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-cart">Votre panier est vide</p>
      )}
      <div className="total-price">Total: €{calculateTotalPrice()}</div>
      <button className="submit-order" onClick={handleOrderSubmission}>
        Finalisez votre Commande
      </button>
    </div>
  );
};

export default CartAndOrderSummary;
