import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditItemForm from "./EditItemForm";
import { getItemById, updateItem } from "../../functions/frontFunctions";

function EditItem() {
  const { type, itemId } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(type, itemId);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        setError("Failed to load item.");
      }
    };

    fetchItem();
  }, [type, itemId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedItem = await updateItem(type, itemId, item, authToken);
      console.log("Update successful:", updatedItem);
      navigate("/admin");
    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
      setError(`Failed to update ${type}: ${error.message}`);
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <EditItemForm
      item={item}
      itemType={type}
      onChange={handleFormChange}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
    />
  );
}

export default EditItem;
