import React from "react";
import { Link } from "react-router-dom";
import "../assets/lesProduits.css";
import DessertImg from "../assets/Dessert- Imgur.png";
import BoissonImg from "../assets/Boisson - Imgur (1).png";
import BurgerImg from "../assets/Burgers - Imgur.png";
import MenuImg from "../assets/Burger House Menus - Imgur.png";

//Composant qui affiche les categories principales telles que les Menus, Les Burgers, Les Glaces et les Boissons
function Carte() {
  return (
    <main className="carte">
      <section id="services" className="services">
        <div className="container">
          <h2 className="menuTitle">La carte</h2>
          <p className="message">
            faites-vous plaisir : il y en a pour tous les goûts !
          </p>
          <div className="services-grid">
            <Link to="/produits/Menu">
              <div className="service">
                <div className="content">
                  <div className="menuName">Menus</div>
                </div>
                <figure className="img-box">
                  <img src={MenuImg} className="img" alt="Menus" />
                </figure>
              </div>
            </Link>

            <Link to="/produits/Burgers">
            <div className="service">
              <div className="content">
                <div className="menuName">Burgers</div>
              </div>
              <figure className="img-box">
                <img src={BurgerImg} className="img" alt="Burgers" />
              </figure>
            </div>
            </Link>

            <Link to="/produits/Boissons">
            <div className="service">
              <div className="content">
                <div className="menuName">Boissons</div>
              </div>
              <figure className="img-box">
                <img src={BoissonImg} className="img" alt="Boissons" />
              </figure>
            </div>
            </Link>

            <Link to="/produits/Glaces">
            <div className="service">
              <div className="content">
                <div className="menuName">Glaces</div>
              </div>
              <figure className="img-box">
                <img src={DessertImg} className="img" alt="Glaces" />
              </figure>
            </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Carte;
