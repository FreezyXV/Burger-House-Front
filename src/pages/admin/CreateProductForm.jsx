import React, { useState } from "react";
import { createProduct } from "../../../../Back/src/api/functions";
import "../../assets/Admin.css";

function CreateProductForm({ onAdd, onClose }) {
  const [product, setProduct] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct(product);
      onAdd(newProduct);
      setProduct({});
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div className={`form-container ${!isVisible ? "hidden" : ""}`}>
      <div className="form-title">Ajoutez un Nouvel Produit</div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-field"
          type="text"
          name="title"
          value={product.title || ""}
          onChange={handleChange}
          placeholder="Titre"
          required
        />
        <textarea
          className="form-field"
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          className="form-field"
          type="number"
          name="price"
          value={product.price || 0}
          onChange={handleChange}
          placeholder="Prix"
          required
        />
        <input
          className="form-field"
          type="text"
          name="imageSrc"
          value={product.imageSrc || ""}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <select
          className="form-select"
          name="type"
          value={product.type || ""}
          onChange={handleChange}
        >
          <option value="Burger">Burger</option>
          <option value="Drink">Boisson</option>
          <option value="Menu">Menu</option>
          <option value="Accompagnement">Accompagnement</option>
          <option value="IceCream">Glace</option>
        </select>
        <div className="form-buttons">
          <button type="submit" className="button save-button">
            Ajouter
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProductForm;
