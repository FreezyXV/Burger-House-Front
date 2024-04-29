import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/produit.css";

// Ce composant permet d'afficher le Produit concerné et de l'envoyer vers le Panier
function Produit({ addToCart }) {
  const { type, productId } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const MAX_QUANTITY = 10;

  // Fonction qui permet d'afficher les informations du Product
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getItemById(type, productId);

        if (!data || !data.title) {
          throw new Error("Product not found.");
        }
        setItem(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    } else {
      setError("No product ID provided.");
      setIsLoading(false);
    }
  }, [productId]);

  
  async function getItemById(type, id) {
    var response = null;
  
    if (type === "Menu") {
      response = await fetch(`${import.meta.env.VITE_API_URL}/api/menus/${id}`);
    } else {
      response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
    }
  
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
  
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }

  // Fonction qui permet d'ajouter ou d'enlever la quantité du produit concerné
  const handleQuantityChange = (changeType) => {
    setQuantity((prevQuantity) => {
      if (changeType === "decrease") {
        return Math.max(1, prevQuantity - 1);
      } else if (changeType === "increase") {
        return Math.min(MAX_QUANTITY, prevQuantity + 1);
      }
      return prevQuantity;
    });
  };

  // Fonction qui permet d'ajouter la quantité du produit en question dans le Panier
  const handleOrderProductSubmit = async () => {
    try {
      const cartItem = {
        itemRef: item._id,
        onModel: "Product",
        quantity: quantity,
        price: item.price,
      };

      addToCart(cartItem);

      console.log("Order submitted successfully");
    } catch (error) {
      console.error("Error submitting order:", error.message);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!item) {
    return <div className="error-message">Product not found.</div>;
  }

  return (
    <main>
      <div className="product-section">
        <article className="product-description">
          <div className="product-title">
            <h1>{item.title}</h1>
          </div>
          <p className="product-details">{item.description}</p>
        </article>
        <img src={item.imageSrc} alt={item.title} className="product-image" />
        <section className="achat">
          <p className="text">
            Prix unitaire: €
            <span className="unit-price">{item.price.toFixed(2)}</span>
          </p>
          <article className="purchase-section">
            <div className="price-info">
              <div className="quantity-selector">
                <div className="quantity-control">
                  <p className="text">Quantité</p>
                  <div className="quantity-buttons">
                    <button
                      className="quantity-decrease"
                      onClick={() => handleQuantityChange("decrease")}
                    >
                      -
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button
                      className="quantity-increase"
                      onClick={() => handleQuantityChange("increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="total-cost">
                  Total: €{(item.price * quantity).toFixed(2)}
                </div>
                <button
                  className="order-button"
                  onClick={handleOrderProductSubmit}
                >
                  Commander
                </button>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Produit;
