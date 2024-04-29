import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/products.css";

// Configuration
const BASE_URL = "http://localhost:2233/api";

// Function to fetch all items
const getAllItems = async (type) => {
    try {
        const endpoint = type ? `/products?type=${type}` : "/products";
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const items = await response.json();
        return items;
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
};

// Function to fetch all menus
const getAllMenus = async () => {
    try {
        const response = await fetch(`${BASE_URL}/menus`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allMenus = await response.json();
        return allMenus;
    } catch (error) {
        console.error("Error fetching menus: ", error);
        throw error;
    }
};

// Custom hook to fetch items based on the category name
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

// Component to display products and menus
function LesProduits() {
    const { categoryName } = useParams();
    const { items, loading, error } = useFetchItems(categoryName);

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
                                  to={`/${categoryName === "Menu" ? "menu" : "product"}/${item._id}`}
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
