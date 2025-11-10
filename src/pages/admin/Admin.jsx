import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProductForm from "./CreateProductForm";
import CreateMenuForm from "./CreateMenuForm";
import "../../assets/Admin.css";

import {
  getAllItems,
  getAllMenus,
  deleteProduct,
  deleteMenu,
} from "../../functions/frontFunctions";

function Admin() {
  const [products, setProducts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showProductForm, setShowProductForm] = useState(false);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const authToken = localStorage.getItem("userToken");

  const closeProductForm = () => setShowProductForm(false);
  const closeMenuForm = () => setShowMenuForm(false);

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching products and menus...');
        const fetchedProducts = await getAllItems();
        const fetchedMenus = await getAllMenus();
        setProducts(fetchedProducts);
        setMenus(fetchedMenus);
        console.log("Fetched products:", fetchedProducts);
        console.log("Fetched menus:", fetchedMenus);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      const deleteFunction = type === "product" ? deleteProduct : deleteMenu;
      await deleteFunction(id, authToken);
      if (type === "product") {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      } else {
        setMenus((prevMenus) => prevMenus.filter((menu) => menu._id !== id));
      }
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
      setError(`Failed to delete ${type}. Please try again.`);
    }
  };

  const handleEditClick = (item, itemType) => {
    navigate(`/admin/edit/${itemType}/${item._id}`);
  };

  if (!user || !user.isAdmin) {
    return <div className="not-allowed">Not allowed</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-container">
      <div className="grids">
        <div className="products">
          <div className="title">Produits</div>
          <div className="grid">
            {products.map((product) => (
              <div key={product._id} className="item">
                {product.title}
                <div className="buttons">
                  <button
                    onClick={() => handleEditClick(product, "product")}
                    className="edit"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product._id, "product")}
                    className="delete"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="generalAddProductBtn"
            onClick={() => setShowProductForm(true)}
          >
            Ajouter un Produit
          </button>
          {showProductForm && (
            <div className="form-container">
              <CreateProductForm
                onAdd={(product) => {
                  setProducts((prev) => [...prev, product]);
                  closeProductForm();
                }}
                onClose={closeProductForm}
                authToken={authToken}
              />
            </div>
          )}
        </div>

        <div className="menus">
          <div className="title">Menus</div>
          <div className="grid">
            {menus.map((menu) => (
              <div key={menu._id} className="item">
                {menu.title}
                <div className="buttons">
                  <button
                    onClick={() => handleEditClick(menu, "menu")}
                    className="edit"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(menu._id, "menu")}
                    className="delete"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="generalAddProductBtn"
            onClick={() => setShowMenuForm(true)}
          >
            Ajouter un Menu
          </button>
          {showMenuForm && (
            <div className="form-container">
              <CreateMenuForm
                onAdd={(menu) => {
                  setMenus((prev) => [...prev, menu]);
                  closeMenuForm();
                }}
                onClose={closeMenuForm}
                authToken={authToken}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
