import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./assets/App.css";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const clearCart = () => {
    console.log("Clearing cart...");
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <>
      <Navbar clearCart={clearCart} />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
