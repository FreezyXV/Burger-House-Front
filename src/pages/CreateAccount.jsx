import React, { useState } from "react";
import "../assets/Account.css";
import { useNavigate } from "react-router-dom";

// Component for creating a new user account
function CreateAccount() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.username || !user.password || !user.email) {
            console.error("Username, password, and email are required.");
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:2233/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            navigate("/connexion");
        } catch (error) {
            const errorMessage = error.message || "An error occurred during the API call.";
            console.error("An error occurred: ", errorMessage);
            alert(errorMessage);
        }
    };

    const handleGoToSignIn = () => {
        navigate("/connexion");
    };

    return (
        <div className="page">
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit} className="create-account-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username || ""}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password || ""}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={user.name || ""}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={user.surname || ""}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email || ""}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={user.phone || ""}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={user.address || ""}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="zipcode"
                    placeholder="Zip Code"
                    value={user.zipcode || ""}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={user.city || ""}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    value={user.dateOfBirth || ""}
                    onChange={handleChange}
                />

                <div className="button-container">
                    <button type="submit" className="save-button">
                        Create Account
                    </button>
                    <button
                        type="button"
                        onClick={handleGoToSignIn}
                        className="cancel-button"
                    >
                        Connectez-vous
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;
