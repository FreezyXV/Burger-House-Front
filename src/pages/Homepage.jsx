import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";
import BurgerImg from "../assets/Burgers - Imgur.png";
import MenuImg from "../assets/Burger House Menus - Imgur.png";
import "../assets/homepage.css";

function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef();
  const totalSlides = 3;

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 2000);
    return () => clearInterval(slideInterval.current);
  }, []);

  return (
    <main>
      <div
        className="slider-container"
        onMouseOver={() => clearInterval(slideInterval.current)}
        onMouseOut={() => {
          clearInterval(slideInterval.current);
          slideInterval.current = setInterval(nextSlide, 2000);
        }}
      >
        <img
          className={`slider-img ${currentIndex === 0 ? "active" : ""}`}
          src={Banner1}
          alt="Slide 1"
        />
        <img
          className={`slider-img ${currentIndex === 1 ? "active" : ""}`}
          src={Banner2}
          alt="Slide 2"
        />
        <img
          className={`slider-img ${currentIndex === 2 ? "active" : ""}`}
          src={Banner3}
          alt="Slide 3"
        />
      </div>

      <div className="slider-dots">
        {[...Array(totalSlides)].map((_, index) => (
          <span
            key={index}
            className={`slider-dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
      
      <section className="quick-links-homepage">
      <Link to="/produits/Menu">
              <div className="Shorcut">
                <div className="Shorcut-content">
                  <div className="menuName">Découvrez nos Menus</div>
                </div>
                <figure className="img-box">
                  <img src={MenuImg} className="img" alt="Menus" />
                </figure>
              </div>
            </Link>
            <Link to="/produits/Burgers">
            <div className="Shorcut">
              <div className="Shorcut-content">
                <div className="menuName">Découvrez nos Burgers</div>
              </div>
              <figure className="img-box">
                <img src={BurgerImg} className="img" alt="Burgers" />
              </figure>
            </div>
            </Link>
      </section>

      <section className="store-locator">
        <h2>Venez à cette adresse:</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.498842685599!2d2.309779515674995!3d48.87252577928868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc1fbf83f13%3A0x47b250218112d60a!2s124%20Rue%20La%20Bo%C3%A9tie%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1664534861601!5m2!1sen!2sus"
          width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </section>
    </main>
  );
}

export default Homepage;
