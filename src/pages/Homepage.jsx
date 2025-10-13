import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";
import BurgerImg from "../assets/Burgers - Imgur.png";
import MenuImg from "../assets/Burger House Menus - Imgur.png";
import "../assets/homepage.css";
import "../assets/navbar.css";

function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);
  const totalSlides = 3;

  const goToSlide = (index) => setCurrentIndex(index);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Go to previous slide
  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const startSlider = () => {
    slideInterval.current = setInterval(nextSlide, 3000);
  };

  const stopSlider = () => {
    clearInterval(slideInterval.current);
  };

  useEffect(() => {
    startSlider();
    return () => stopSlider(); // Clean up interval on component unmount
  }, []);

    // Swipe handlers
    const swipeHandlers = useSwipeable({
      onSwipedLeft: nextSlide,
      onSwipedRight: previousSlide,
      // Allows swiping with mouse on desktop for testing
      trackMouse: true, 
      preventScrollOnSwipe: true,
    });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <main className="homepage-main">
      <motion.section
        className="homepage1"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div
          className="slider-container"

          {...swipeHandlers}
          onMouseOver={stopSlider}
          onMouseOut={startSlider}
        >

          <div className="slider-overlay">
            <motion.div
              className="homepage1-blockText"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1>Discover the Taste of Burger Town</h1>
              <h4>Indulge in the Juicy Flavors of Signature Burgers</h4>
              <Link className="link" to="/commande">
                <button>Order Now</button>
              </Link>
              <p>Experience the Burger Town Difference</p>
            </motion.div>
          </div>


          <img
            className={`slider-img ${currentIndex === 0 ? "active" : ""}`}
            src={Banner1}
            alt="Slide 1"
            loading="lazy"
          />
          <img
            className={`slider-img ${currentIndex === 1 ? "active" : ""}`}
            src={Banner2}
            alt="Slide 2"
            loading="lazy"
          />
          <img
            className={`slider-img ${currentIndex === 2 ? "active" : ""}`}
            src={Banner3}
            alt="Slide 3"
            loading="lazy"
          />
        </div>

        <div className="slider-dots">
          {[...Array(totalSlides)].map((_, index) => (
            <span
              key={index}
              className={`slider-dot ${
                currentIndex === index ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </motion.section>



      <motion.section
        className="quick-links-homepage"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.div className="quick-links-homepage-TextBlock" variants={fadeInUp}>
          <h1>Explore the Burger Town Experience</h1>
          <h3>At Burger Town, We Understand the Importance of Delivering a Truly Exceptional Burger Experience. Our Culinary Team Meticulously Selects the Finest Ingredients</h3>
        </motion.div>
        <div className="homepage-cards">
          <Link to="/produits/Menu">
            <motion.div
              className="Shorcut"
              variants={scaleIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="Shorcut-content">
                <div className="menuName">Découvrez nos Menus</div>
              </div>
              <figure className="img-box">
                <img src={MenuImg} className="img" alt="Menus" />
              </figure>
            </motion.div>
          </Link>
          <Link to="/produits/Burgers">
            <motion.div
              className="Shorcut"
              variants={scaleIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="Shorcut-content">
                <div className="menuName">Découvrez nos Burgers</div>
              </div>
              <figure className="img-box">
                <img src={BurgerImg} className="img" alt="Burgers" />
              </figure>
            </motion.div>
          </Link>
        </div>
      </motion.section>

      {/* Store locator */}
      <motion.section
        className="store-locator"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2>Venez à cette adresse:</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.498842685599!2d2.309779515674995!3d48.87252577928868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc1fbf83f13%3A0x47b250218112d60a!2s124%20Rue%20La%20Bo%C3%A9tie%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1664534861601!5m2!1sen!2sus"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.section>

      <motion.section
        className="homepage4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="homepage4-overlay">
          <motion.div className="text-block" variants={fadeInUp}>
            <h1>Discover the Art of Burger</h1>
            <h1 className="homepage4-title">Burger Town:</h1>
            <p>
              Indulge in the Juicy, Flavorful Burgers at Burger Town. Our Chefs
              Meticulously Craft Each Patty Using the Freshest, High-Quality
              Ingredients
            </p>
            <Link className="link" to="/commande">
              <button>Order Now</button>
            </Link>
          </motion.div>
        </div>
        <img
          src="https://i.imgur.com/ZrMjMLC.jpeg"
          alt="Burger Image"
          className="homepage4-image"
        />
      </motion.section>
<motion.section
        className="homepage5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.img
          src="https://i.imgur.com/NqG9lXT.jpeg"
          className="homepage5-image"
          variants={scaleIn}
        />
        <motion.div className="homepage5-textBlock" variants={fadeInUp}>
          <h1>Burger Town: Elevating Fast Food Experience</h1>
          <h1 className="homepage4-title">Burgers That Redefine Perfection</h1>
          <p>At Burger Town, We Believe in Crafting the Ultimate Burger Experience. Our Commitment to Quality Ingredients, Innovative Recipes, and Exceptional Service Sets Us Apart</p>
        </motion.div>
      </motion.section>
<motion.section
        className="homepage6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="homepage6-top">
          <motion.div className="text-block-homepage6" variants={fadeInUp}>
            <h1>Discover the Best Burgers </h1>
            <p>Welcome to Burger Town, where we're on a mission to redefine the fast-food experience. Our commitment to quality, innovation, and exceptional service sets us apart</p>
            <Link className="link" to="/produits/Menu">
              <button className="homepage6-buttonWhite">Try It Today</button>
            </Link>
          </motion.div>
        </div>
        <motion.img
          src="https://i.imgur.com/VTgpiDI.jpeg"
          alt=""
          className="homepage6-image"
          variants={scaleIn}
        />
        <div className="homepage6-bottom">
          <motion.div className="text-block-homepage6" variants={fadeInUp}>
            <h1>Burger Town: Where </h1>
            <p>At Burger Town, we believe in elevating the fast-food experience to new heights. Our passion for exceptional burgers is evident in every aspect of our business, from the carefully curated ingredients we use to the meticulous preparation of each </p>
            <Link className="link" to="/carte">
              <button className="homepage6-buttonBlack">Order Now</button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

    </main>
  );
}

export default Homepage;