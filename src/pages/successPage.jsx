import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/SuccessPage.css";

// Composant qui s'affiche lorsque la Commande est validée avec succès
const SuccessPage = () => {
  const navigate = useNavigate();
  const message = "Merci pour votre Commande !";

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="success-container">
      <div className="success-content">
        <h1>Votre Commande est passée avec succès 🎉</h1>
        <p>{message}</p>
        <button onClick={handleClose} className="close-btn">Fermer</button>
      </div>
    </div>
  );
};

export default SuccessPage;
