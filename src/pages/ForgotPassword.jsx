import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Account.css";
import { resetPassword } from "../functions/frontFunctions";

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!formData.email) {
      setStatus({
        type: "error",
        message: "Veuillez renseigner l'email de votre compte.",
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      setStatus({
        type: "error",
        message: "Le mot de passe doit contenir au moins 8 caractères.",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({
        type: "error",
        message: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    try {
      setLoading(true);
      await resetPassword({
        email: formData.email,
        newPassword: formData.newPassword,
      });

      setStatus({
        type: "success",
        message: "Mot de passe mis à jour. Redirection...",
      });

      setTimeout(() => navigate("/connexion"), 1500);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="Account-title">Réinitialiser votre mot de passe</h1>
      <form onSubmit={handleSubmit} className="create-account-form-sign">
        <p className="page-subtitle">
          Entrez l'email associé à votre compte et choisissez un nouveau mot de
          passe.
        </p>
        <input
          type="email"
          name="email"
          placeholder="Email du compte"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmez le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {status.message && (
          <p className={status.type === "error" ? "error" : "success"}>
            {status.message}
          </p>
        )}
        <div className="button-container">
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Mise à jour..." : "Réinitialiser"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
