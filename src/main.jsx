// src/main.jsx
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Carte from "./pages/Carte.jsx";
import Homepage from "./pages/Homepage.jsx";
import Admin from "./pages/admin/Admin.jsx";
import EditItem from "./pages/admin/EditItem.jsx";
import LesProduits from "./pages/LesProduits.jsx";
import Produit from "./pages/Produit.jsx";
import Menu from "./pages/Menu.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import SignIn from "./pages/SignIn.jsx";
import CartAndOrderSummary from "./pages/CartAndOrderSummary.jsx";
import NotFound from "./pages/NotFound.jsx";
import SuccessPage from "./pages/successPage.jsx";
import Account from "./pages/Account.jsx";
import CreateMenu from "./pages/admin/CreateMenuForm.jsx";
import CreateProduct from "./pages/admin/CreateProductForm.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import "./assets/App.css";

const AppRouter = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const [nextUniqueId, setNextUniqueId] = useState(1);

  const addToCart = (item) => {
    setCartItems((currentItems) => [
      ...currentItems,
      { ...item, uniqueId: nextUniqueId },
    ]);
    setNextUniqueId((prevId) => prevId + 1);
  };

  const updateCart = (updatedItem) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.map((item) =>
        item.itemRef === updatedItem.itemRef ? updatedItem : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeItemFromCart = (uniqueId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.uniqueId !== uniqueId)
    );
  };

  const clearCart = () => {
    console.log("Clearing cart...");
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const handleUserLogin = async (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    await fetchCartItems(userData);
  };

  const handleUserLogout = () => {
    console.log("Logging out...");
    setUser(null);
    clearCart();
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    window.dispatchEvent(
      new CustomEvent("loginStateChanged", { detail: null })
    );
  };

  const fetchCartItems = async (user) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/carts/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData.items);
      } else {
        console.error("Failed to fetch cart items:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <App
          user={user}
          onUserLogin={handleUserLogin}
          onUserLogout={handleUserLogout}
        />
      ),
      children: [
        { path: "/", element: <Homepage />, index: true },
        { path: "carte", element: <Carte /> },
        { path: "admin", element: <Admin /> },
        {
          path: "inscription",
          element: <CreateAccount onUserLogin={handleUserLogin} />,
        },
        {
          path: "connexion",
          element: <SignIn onUserLogin={handleUserLogin} />,
        },
        { path: "admin/edit/:type/:itemId", element: <EditItem /> },
        { path: "create-menu", element: <CreateMenu /> },
        { path: "create-product", element: <CreateProduct /> },
        { path: "produits/:categoryName", element: <LesProduits /> },
        {
          path: "product/:productId",
          element: <Produit addToCart={addToCart} />,
        },
        {
          path: "menu/:menuId/products/:categoryName",
          element: <LesProduits />,
        },
        {
          path: "menu/:menuId",
          element: <Menu addToCart={addToCart} updateCart={updateCart} />,
        },
        {
          path: "commande",
          element: (
            <CartAndOrderSummary
              user={user}
              cartItems={cartItems}
              clearCart={clearCart}
              onSuccess={() => console.log("Order Successful")}
              onRemoveItemFromCart={removeItemFromCart}
            />
          ),
        },
        { path: "orderconfirmation", element: <SuccessPage /> },
        { path: "*", element: <NotFound /> },
        { path: "mon-compte", element: <Account user={user} /> },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router}>
        <Navbar clearCart={clearCart} onUserLogout={handleUserLogout} />
        <Footer />
      </RouterProvider>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = container._reactRootContainer
  ? createRoot(container, { hydrate: true })
  : createRoot(container);
root.render(<AppRouter />);
