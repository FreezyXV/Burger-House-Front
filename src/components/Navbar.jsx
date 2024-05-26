import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";
import Logo from "../assets/logo.png";
import Cart from "../assets/panier.png";

// Ce Composant est une Barre de Navigations du Site
function Navbar({ clearCart }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userToken"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolling(window.scrollY > 100);
    const checkLoginState = () => setIsLoggedIn(!!localStorage.getItem("userToken"));

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("loginStateChanged", checkLoginState);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("loginStateChanged", checkLoginState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    clearCart();
    navigate("/");
    window.dispatchEvent(new CustomEvent("loginStateChanged"));
  };

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  return (
    <>
      <header className={`navbar ${isScrolling ? "is-scrolling" : ""}`}>
        <div className="menu">
          <button className={`hamburger ${isMenuActive ? "is-active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
            <div className="bar"></div>
          </button>
          <ul className="navbar-links">
            <li><Link className="link" to="/admin">Notre Carte</Link></li>
            {isLoggedIn ? <li><Link className="link" to="/mon-compte">Mon Compte</Link></li> : <li><Link className="link" to="/connexion">Connectez-vous</Link></li>}
          </ul>
        </div>
        <Link to="/"><img src={Logo} className="logotype" alt="Logo" /></Link>
        <div className="header-end">
          <Link to="/commande" className="aMaCommande"><img src={Cart} alt="Cart Icon" className="CartIcon" /><p className="MaCommande">Ma commande</p></Link>
        </div>
      </header>
      <nav className={`mobile-nav ${isMenuActive ? "is-active" : ""}`}>
        <Link to="/commande" className="mobile-nav-link" onClick={toggleMenu}>Ma commande</Link>
        <Link to="/carte" className="mobile-nav-link" onClick={toggleMenu}>Notre Carte</Link>
        {isLoggedIn ? (
          <>
            <Link to="/mon-compte" className="mobile-nav-link" onClick={toggleMenu}>Mon Compte</Link>
            <button onClick={handleLogout} className="mobile-nav-link logout-button">Se Déconnecter</button>
          </>
        ) : (
          <Link to="/connexion" className="mobile-nav-link" onClick={toggleMenu}>Connectez-vous</Link>
        )}
      </nav>
    </>
  );
}

export default Navbar;
