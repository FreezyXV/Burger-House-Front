import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProductForm from "./CreateProductForm";
import CreateMenuForm from "./CreateMenuForm";
import "/Users/yoanpetrov/Desktop/Code/Burger Town Certification/Front/src/assets/Admin.css";

import {
  getAllItems,
  getAllMenus,
  deleteProduct,
  deleteMenu,
} from "../../../../Back/src/api/functions";

function Admin() {
  const [products, setProducts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showProductForm, setShowProductForm] = useState(false);
  const [showMenuForm, setShowMenuForm] = useState(false);

  const closeProductForm = () => setShowProductForm(false);
  const closeMenuForm = () => setShowMenuForm(false);

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProducts(await getAllItems());
        setMenus(await getAllMenus());
      } catch (error) {
        setError("Failed to load data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      const deleteFunction = type === "product" ? deleteProduct : deleteMenu;
      await deleteFunction(id);
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
    navigate(`/admin/edit/${item.type}/${item._id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user.isAdmin) {
    return "Not allowed";
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
                    onClick={() => handleEditClick(product, product._id)}
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
            <CreateProductForm
              onAdd={(product) => {
                setProducts((prev) => [...prev, product]);
                closeProductForm();
              }}
              onClose={closeProductForm}
            />
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
                    onClick={() => handleEditClick(menu, menu._id)}
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
            <CreateMenuForm
              onAdd={(menu) => {
                setMenus((prev) => [...prev, menu]);
                closeMenuForm();
              }}
              onClose={closeMenuForm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
