import React from "react";
import "../../assets/Admin.css";

function EditItemForm({ item, itemType, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="edit-item-form">
      <input
        type="text"
        name="title"
        placeholder="Titre"
        value={item.title || ""}
        onChange={onChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={item.description || ""}
        onChange={onChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Prix"
        value={item.price || ""}
        onChange={onChange}
      />
      <input
        type="text"
        name="imageSrc"
        placeholder="Image URL"
        value={item.imageSrc || ""}
        onChange={onChange}
      />

      {itemType === "product" && (
        <select name="type" value={item.type || ""} onChange={onChange}>
          <option value="Burger">Burger</option>
          <option value="Drink">Boisson</option>
          <option value="Menu">Menu</option>
          <option value="Accompagnement">Accompagnement</option>
          <option value="IceCream">Glace</option>
        </select>
      )}

      {itemType === "menu" && (
        <select name="size" value={item.size || "medium"} onChange={onChange}>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      )}

      <div className="button-container">
        <button type="submit" className="save-button">
          Sauvegarder
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Annuler
        </button>
      </div>
    </form>
  );
}

export default EditItemForm;
