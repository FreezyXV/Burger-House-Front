import React, { useState } from "react";
import "../../assets/Admin.css";
import { createMenu } from "../../../../Back/src/api/functions";

function CreateMenuForm({ onAdd, onClose }) {
  const [menu, setMenu] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMenu = await createMenu(menu);
      onAdd(newMenu);
      setMenu({});
    } catch (error) {
      console.error("Failed to add menu:", error);
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div className={`form-container ${!isVisible ? "hidden" : ""}`}>
      <div className="form-title">Ajoutez un Nouvel Menu</div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-field"
          type="text"
          name="title"
          value={menu.title || ""}
          onChange={handleChange}
          placeholder="Titre"
          required
        />
        <textarea
          className="form-field"
          name="description"
          value={menu.description || ""}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          className="form-field"
          type="number"
          name="price"
          value={menu.price || ""}
          onChange={handleChange}
          placeholder="Prix"
          required
        />
        <input
          className="form-field"
          type="text"
          name="imageSrc"
          value={menu.imageSrc || ""}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <select
          className="form-select"
          name="size"
          value={menu.size || "medium"}
          onChange={handleChange}
        >
          <option value="medium">Medium</option>
          <option value="large">Large</option>
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

export default CreateMenuForm;
