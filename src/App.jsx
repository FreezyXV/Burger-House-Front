import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/global.css";
import "./assets/variables.css";
import "./assets/App.css";

function App({ clearCart }) {
  return (
    <div className="app-container">
      <Navbar clearCart={clearCart} />
      <div className="content-wrap">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
