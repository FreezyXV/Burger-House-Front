import React, { useState, useEffect, useRef } from "react";
import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpeg";
import Banner3 from "../assets/banner3.jpg.avif";
import "../assets/homepage.css";

// Ce Composant est une Page d'Accueil
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
    </main>
  );
}

export default Homepage;
