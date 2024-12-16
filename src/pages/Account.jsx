import React, { useState, useEffect } from "react";
import "../assets/Account.css";

//Composant qui permet gerer les informations de l'utilisateur connecté en cours
function Account({ user }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    zipcode: "",
    city: "",
    dateOfBirth: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const formattedDate = user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "";
      setUserInfo({
        ...user,
        dateOfBirth: formattedDate,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.newPassword.trim() !== userInfo.confirmNewPassword.trim()) {
      setError("New password entries do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({
            name: userInfo.name,
            surname: userInfo.surname,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
            zipcode: userInfo.zipcode,
            city: userInfo.city,
            dateOfBirth: userInfo.dateOfBirth,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserInfo({ ...userInfo, ...updatedUser });

      if (userInfo.newPassword && userInfo.currentPassword) {
        const passwordResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/change-password/${
            user._id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            body: JSON.stringify({
              currentPassword: userInfo.currentPassword,
              newPassword: userInfo.newPassword,
            }),
          }
        );

        if (!passwordResponse.ok) {
          const errorText = await passwordResponse.text();
          throw new Error(`Failed to change password: ${errorText}`);
        }

        alert("Password changed successfully");
      }

      alert("Profile updated successfully");
      setError("");
    } catch (error) {
      setError("Failed to update profile or password: " + error.message);
    }
  };

  return (
    <div className="account-page">
      <h1 className="Account-title">Mon Compte</h1>
      <form onSubmit={handleSubmit} className="create-account-form">
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="Prénom"
        />
        <input
          type="text"
          name="surname"
          value={userInfo.surname}
          onChange={handleChange}
          placeholder="Nom"
        />
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          placeholder="Téléphone"
        />
        <input
          type="text"
          name="address"
          value={userInfo.address}
          onChange={handleChange}
          placeholder="Addresse"
        />
        <input
          type="text"
          name="zipcode"
          value={userInfo.zipcode}
          onChange={handleChange}
          placeholder="Code Postal"
        />
        <input
          type="text"
          name="city"
          value={userInfo.city}
          onChange={handleChange}
          placeholder="Ville"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={userInfo.dateOfBirth}
          onChange={handleChange}
          placeholder="Date de Naissance"
        />
        <input
          type="password"
          name="currentPassword"
          value={userInfo.currentPassword}
          onChange={handleChange}
          placeholder="Mot de Passe Actuel"
        />
        <input
          type="password"
          name="newPassword"
          value={userInfo.newPassword}
          onChange={handleChange}
          placeholder="Nouveau Mot de Passe"
        />
        <input
          type="password"
          name="confirmNewPassword"
          value={userInfo.confirmNewPassword}
          onChange={handleChange}
          placeholder="Confirmez votre Nouveau Mot de Passe"
        />
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <button type="submit" className="save-button">
            Actualiser les Informations
          </button>
        </div>
      </form>
    </div>
  );
}

export default Account;
