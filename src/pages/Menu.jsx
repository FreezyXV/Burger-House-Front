
// src/pages/Menu.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getMenuById, getAllItems } from "../functions/frontFunctions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/Menu.css";

function Menu({ addToCart, updateCart }) {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isModifyingState =
    new URLSearchParams(location.search).get("modify") === "true";

  const [menuDetails, setMenuDetails] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const menuData = await getMenuById(menuId);
        const productsData = await getAllItems();
        setMenuDetails(menuData);
        setAllProducts(productsData);
      } catch (error) {
        setError("Failed to load data: " + error.message);
      }
      setIsLoading(false);
    };
    fetchMenuDetails();
  }, [menuId]);

  const handleOptionChange = (category, value) => {
    setSelectedOptions((prev) => ({ ...prev, [category]: value }));
  };

  const calculateTotalPrice = () => {
    let price = menuDetails ? menuDetails.price : 0;
    if (selectedOptions.size === "large") {
      price += 0.9;
    }
    return price;
  };

  const handleSubmitMenuOrder = () => {
    if (!menuDetails || Object.keys(selectedOptions).length === 0) {
      setError("Please select options before submitting.");
      return;
    }
    const cartItem = {
      itemRef: menuDetails._id, // Required
      onModel: "Menu",          // Must be "Menu"
      quantity: 1,
      price: calculateTotalPrice(),
      selectedOptions: { ...selectedOptions },
    };

    if (isModifyingState) {
      updateCart(cartItem);
      toast.info("Cart updated successfully!");
    } else {
      addToCart(cartItem);
      toast.success("Item added to cart!");
    }
    navigate("/commande");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!menuDetails) return <div>Menu not found</div>;

  return (
    <div className="menu-container">
      <ToastContainer position="bottom-center" />
      <section className="menuSection">
        <h1 className="exactMenuTitle">{menuDetails.title}</h1>
        <img
          src={menuDetails.imageSrc}
          alt={menuDetails.title}
          className="menu-image"
        />
        <p className="menu-description">{menuDetails.description}</p>
      </section>
      <div className="size-section">
        <h2>Choisissez la taille de votre Menu :</h2>
        {["medium", "large"].map((size) => (
          <div
            key={size}
            className={`menu-size-option ${
              selectedOptions.size === size ? "selected" : ""
            }`}
            onClick={() => handleOptionChange("size", size)}
            role="button"
            aria-pressed={selectedOptions.size === size}
            tabIndex={0}
          >
            <img
              src={`https://i.imgur.com/${
                size === "medium" ? "KuCqzY6" : "gAuWatT"
              }.png`}
              alt={`${size} size option`}
              className="menu-size-icon"
            />
            <span className="sizeLabel">
              {size.charAt(0).toUpperCase() + size.slice(1)}
              {size === "large" ? " (+€0.90)" : ""}
            </span>
          </div>
        ))}
      </div>
      {["Boissons", "Accompagnements", "Sauces", "Glaces"].map((category) => (
        <div className="menu-section" key={category}>
          <h2>{category.toLowerCase()}</h2>
          <div className="product-options">
            {allProducts
              .filter((product) => product.type === category)
              .map((product) => (
                <div
                  key={product._id}
                  className={`product-option ${
                    selectedOptions[category] === product._id ? "selected" : ""
                  }`}
                  onClick={() => handleOptionChange(category, product._id)}
                >
                  <img
                    src={product.imageSrc}
                    alt={product.title}
                    className="product-image"
                  />
                  <span className="productTitle">{product.title}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div className="total-price">
        Votre Total: €{calculateTotalPrice().toFixed(2)}
      </div>
      <button
        className={isModifyingState ? "modify-order" : "submit-order"}
        onClick={handleSubmitMenuOrder}
      >
        {isModifyingState ? "Finir la Modification" : "Ajouter au Panier"}
      </button>
    </div>
  );
}

export default Menu;
