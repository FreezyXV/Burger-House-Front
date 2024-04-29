import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Account.css";

// Composant qui permet a l'utilisateur de se connecter ou d'aller sur la page de création de Compte
function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit();
  };

  return (
    <div className="page">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="create-account-form">
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
