import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/products.css";
import {
  getAllItems,
  getAllMenus,
} from "/Users/yoanpetrov/Desktop/Code/Burger Town Certification/Back/src/api/functions.js";

// Ce composant sert a Afficher Les Produits et les Menus
function LesProduits() {
  const { categoryName } = useParams();
  const { items, loading, error } = useFetchItems(categoryName);

function useFetchItems(categoryName) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchItems = async () => {
      try {
        let fetchedItems = [];
        if (categoryName === "Menu") {
          fetchedItems = await getAllMenus();
        } else {
          const allProducts = await getAllItems();
          fetchedItems = allProducts.filter(
            (product) => product.type === categoryName
          );
        }
        setItems(fetchedItems);
      } catch (error) {
        setError("Error fetching items: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [categoryName]);

  return { items, loading, error };
}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="carte1">
      <section className="services1">
        <div className="container1">
          <h2 className="menuTitle">{categoryName}</h2>
          <div className="services-grid1">
            {items.length > 0 ? (
              items.map((item) => (
                <Link
                  to={`/${categoryName === "Menu" ? "menu" : "product"}/${
                    item._id
                  }`}
                  key={item._id}
                >
                  <div className="service">
                    <figure className="img-box">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="img"
                      />
                    </figure>
                    <div className="content">
                      <h3 className="menu-Title">{item.title}</h3>
                      {categoryName !== "Menu" && (
                        <p className="price">Price: ${item.price}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No items found in this category.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default LesProduits;
