import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItemById, submitOrder } from "../functions/frontFunctions";
import "../assets/summary.css";

// Ce Composant est le Panier du Site
const CartAndOrderSummary = ({
  cartItems,
  onRemoveItemFromCart,
  onSuccess,
  clearCart,
}) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [itemsWithDetails, setItemsWithDetails] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    let cancelled = false;

    const hydrateCartItems = async () => {
      if (!cartItems.length) {
        setItemsWithDetails([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const enrichedItems = await Promise.all(
          cartItems.map(async (cartItem) => {
            if (
              (cartItem.onModel !== "Menu" && cartItem.onModel !== "Product") ||
              !cartItem.itemRef
            ) {
              console.warn("Skipping invalid cart item", cartItem);
              return null;
            }

            const itemDetails = await getItemById(
              cartItem.onModel,
              cartItem.itemRef
            );

            if (!itemDetails) {
              console.warn("No details found for cart item", cartItem);
              return null;
            }

            let resolvedOptions = {};
            if (cartItem.onModel === "Menu" && cartItem.selectedOptions) {
              const optionIds = Object.values(cartItem.selectedOptions).filter((id) =>
                /^[0-9a-fA-F]{24}$/.test(id)
              );

              const optionsDetails = await Promise.all(
                optionIds.map((id) => getItemById("Product", id))
              );

              resolvedOptions = optionIds.reduce((acc, optionId, index) => {
                const optionDetail = optionsDetails[index];
                if (optionDetail) {
                  acc[optionId] = optionDetail;
                }
                return acc;
              }, {});
            }

            return {
              ...itemDetails,
              ...cartItem,
              resolvedOptions,
            };
          })
        );

        if (!cancelled) {
          setItemsWithDetails(enrichedItems.filter(Boolean));
        }
      } catch (error) {
        console.error("Error fetching item images and details:", error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    hydrateCartItems();

    return () => {
      cancelled = true;
    };
  }, [cartItems]);

  const calculateTotalPrice = () => {
    return itemsWithDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleOrderSubmission = async () => {
    if (!itemsWithDetails.length) {
      alert("No items in cart.");
      return;
    }

    if (!user) {
      alert("Veuillez vous connecter pour passer une commande.");
      navigate("/connexion");
      return;
    }

    if (!user.name || !user.email) {
      alert("Please complete your profile before placing an order.");
      navigate("/mon-compte");
      return;
    }

    const orderPayload = {
      items: itemsWithDetails.map((item) => ({
        itemRef: item.itemRef,
        onModel: item.onModel,
        quantity: item.quantity,
        selectedOptions: item.selectedOptions || {},
      })),
      totalPrice: calculateTotalPrice(),
    };

    try {
      const authToken = localStorage.getItem("userToken");
      const response = await submitOrder(orderPayload, authToken);
      localStorage.setItem("lastOrder", JSON.stringify(response));
      clearCart?.();
      onSuccess?.();
      navigate("/orderconfirmation", {
        state: { message: "Your order has been placed successfully!" },
      });
    } catch (error) {
      alert(`Failed to submit order: ${error.message}`);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Votre Commande</h2>
      {itemsWithDetails.length > 0 ? (
        itemsWithDetails.map((item, index) => (
          <div key={index} className="cart-item">
            <figure className="img-box">
              <img src={item.imageSrc} alt={item.title} className="item-image" />
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
                  {Object.keys(item.resolvedOptions).length > 0 && (
                    <div
                      className={`selected-options ${
                        expandedMenus[item._id] ? "expanded" : ""
                      }`}
                    >
                      {Object.entries(item.resolvedOptions).map(
                        ([optionId, details]) => (
                          <div key={optionId} className="selected-option-detail">
                            {details?.imageSrc && (
                              <img
                                src={details.imageSrc}
                                alt={details.title}
                                style={{ width: "100px", height: "100px" }}
                              />
                            )}
                            <span>{details?.title}</span>
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
                  setItemsWithDetails((prevItems) =>
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
      <div className="total-price">Total: €{calculateTotalPrice().toFixed(2)}</div>
      <button className="submit-order" onClick={handleOrderSubmission}>
        Finalisez votre Commande
      </button>
    </div>
  );
};

export default CartAndOrderSummary;
