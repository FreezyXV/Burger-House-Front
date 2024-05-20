import React from "react";
import "../assets/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-title">À Propos de Nous</h4>
          <p className="footer-section-text">
            Bienvenue à Burger Town, votre destination pour de délicieux
            burgers, boissons et desserts. Nous nous engageons à servir des
            aliments de qualité avec un service excellent.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Liens rapides</h4>
          <ul className="quick-links-footer">
            <li><a className="linkp" href="/">Accueil</a></li>
            <li><a className="linkp" href="/carte">Notre Carte</a></li>
            <li><a className="linkp" href="/commande">Mon Panier</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Suivez-nous</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/burgertown" target="_blank" rel="noreferrer" className="social">
              <i className="fab">Facebook</i>
            </a>
            <a href="https://www.instagram.com/burgertown" target="_blank" rel="noreferrer" className="social">
              <i className="fab">Instagram</i>
            </a>
            <a href="https://www.twitter.com/burgertown" target="_blank" rel="noreferrer" className="social">
              <i class="fab">Twitter</i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Contactez-nous</h4>
          <p>Email: support@burgertown.com</p>
          <p>Téléphone: (123) 456-7890</p>
          <p>Adresse: 123 Rue Burger, Ville de la Nourriture</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Burger Town. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
