import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Account.css";

// Composant qui permet à l'utilisateur de se connecter ou d'aller sur la page de création de compte
function SignIn() {
  // Définir l'état initial pour les informations d'identification de l'utilisateur
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Définir l'état initial pour les erreurs de connexion
  const [loginError, setLoginError] = useState("");

  // Utiliser le hook `useNavigate` pour la navigation programmatique
  const navigate = useNavigate();

  // Utiliser `useEffect` pour vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    // Si un token utilisateur existe dans le localStorage, rediriger vers la page d'accueil
    if (localStorage.getItem("userToken")) {
      navigate("/");
    }
  }, [navigate]);

  // Gérer les changements dans les champs de saisie
  const handleChange = ({ target: { name, value } }) => {
    // Mettre à jour l'état des informations d'identification avec les nouvelles valeurs
    setCredentials((prev) => ({ ...prev, [name]: value }));
    // Réinitialiser le message d'erreur de connexion
    setLoginError("");
  };


  const handleLoginSubmit = async () => {
    const { username, password } = credentials;

    if (!username || !password) {
      setLoginError("Username and password are required.");
      return;
    }

    if (password.length < 8) {
      setLoginError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid username or password.");
      }

      const { token, user } = await response.json();

      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(
        new CustomEvent("loginStateChanged", { detail: user })
      );

      navigate("/");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  // Gérer la soumission du formulaire de connexion
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit();
  };

  return (
    <div className="page">
      <h1 className="Account-title">Connectez-vous</h1>
      <form onSubmit={handleSubmit} className="create-account-form-sign">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        {loginError && <p className="login-error">{loginError}</p>}
        <div className="button-container">
          <button type="submit" className="save-button">
            Connectez-vous
          </button>
          <button
            type="button"
            onClick={() => navigate("/inscription")}
            className="cancel-button"
          >
            Créez votre Compte
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
