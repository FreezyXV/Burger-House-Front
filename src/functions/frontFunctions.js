// // src/frontFunctions.js
// const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// // Afficher tous les Produits (hors Menus)
// export const getAllItems = async (type) => {
//   try {
//     const endpoint = type ? `/products?type=${type}` : "/products";
//     const response = await fetch(`${BASE_URL}${endpoint}`);
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }
//     const items = await response.json();
//     return items;
//   } catch (error) {
//     console.error("There was an error getting all products: ", error);
//     throw error;
//   }
// };

// // Afficher tous les Menus
// export const getAllMenus = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/menus`);
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }
//     const allMenus = await response.json();
//     return allMenus;
//   } catch (error) {
//     console.error("There was an error getting all menus: ", error);
//     throw error;
//   }
// };

// // Afficher le Menu par son ID
// export const getMenuById = async (menuId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/menus/${menuId}`);
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(`There was an error getting menu by ID (${menuId}): `, error);
//     throw error;
//   }
// };

// // Actualiser les informations d'un Produit (Pas Menu)
// export const updateProduct = async (productId, productData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/products/modify/${productId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(productData),
//     });
//     console.log("Product update response status:", response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error updating product: ", error);
//     throw error;
//   }
// };

// // Supprimer un Produit (Pas Menu)
// export const deleteProduct = async (productId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/products/delete/${productId}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error deleting product: ", error);
//     throw error;
//   }
// };

// // Actualiser un Menu
// export const updateMenu = async (menuId, menuData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/menus/modify/${menuId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(menuData),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error updating menu: ", error);
//     throw error;
//   }
// };

// // Supprimer un Menu
// export const deleteMenu = async (menuId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/menus/delete/${menuId}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error deleting menu: ", error);
//     throw error;
//   }
// };

// // Obtenir un Item par ID
// export async function getItemById(type, id) {
//   try {
//     let response = null;

//     if (type === "Menu") {
//       response = await fetch(`${BASE_URL}/menus/${id}`);
//     } else {
//       response = await fetch(`${BASE_URL}/products/${id}`);
//     }

//     if (!response.ok) {
//       if (response.status === 404) {
//         return null;
//       }
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(`Error fetching ${type} by ID (${id}): `, error);
//     throw error;
//   }
// }

// // Actualiser Menu ou Produit
// export const updateItem = async (type, id, updatedItem, authToken) => {
//   const endpoint =
//     type === "Menu" ? `menus/modify/${id}` : `products/modify/${id}`;
//   try {
//     console.log(`Updating ${type} at endpoint: ${endpoint}`);
//     const response = await fetch(`${BASE_URL}/${endpoint}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${authToken}`,
//       },
//       body: JSON.stringify(updatedItem),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(`Error updating ${type} by id (${id}): `, error);
//     throw error;
//   }
// };

// // Valider une Commande
// export const submitOrder = async (orderPayload) => {
//   try {
//     const response = await fetch(`${BASE_URL}/orders`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderPayload),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to submit order");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error submitting order:", error);
//     throw error;
//   }
// };

// // Créer un Produit
// export const createProduct = async (productData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/products/add`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(productData),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error creating product: ", error);
//     throw error;
//   }
// };

// // Créer un Menu
// export const createMenu = async (menuData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/menus/add`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(menuData),
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Error ${response.status}: ${errorText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error creating menu: ", error);
//     throw error;
//   }
// };


// src/frontFunctions.js
// Automatically use local URL in development, production URL in production
const BASE_URL = `${import.meta.env.DEV ? import.meta.env.VITE_API_URL_LOCAL : import.meta.env.VITE_API_URL}/api`;

// Afficher tous les Produits (hors Menus)
export const getAllItems = async (type) => {
  try {
    const endpoint = type ? `/products?type=${type}` : "/products";
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    const items = await response.json();
    return items;
  } catch (error) {
    console.error("There was an error getting all products: ", error);
    throw error;
  }
};

// Afficher tous les Menus
export const getAllMenus = async () => {
  try {
    const response = await fetch(`${BASE_URL}/menus`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    const allMenus = await response.json();
    return allMenus;
  } catch (error) {
    console.error("There was an error getting all menus: ", error);
    throw error;
  }
};

// Afficher le Menu par son ID
export const getMenuById = async (menuId) => {
  try {
    const response = await fetch(`${BASE_URL}/menus/${menuId}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`There was an error getting menu by ID (${menuId}): `, error);
    throw error;
  }
};

// Actualiser les informations d'un Produit (Pas Menu)
export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/modify/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    console.log("Product update response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// Supprimer un Produit (Pas Menu)
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/delete/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

// Actualiser un Menu
export const updateMenu = async (menuId, menuData) => {
  try {
    const response = await fetch(`${BASE_URL}/menus/modify/${menuId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating menu: ", error);
    throw error;
  }
};

// Supprimer un Menu
export const deleteMenu = async (menuId) => {
  try {
    const response = await fetch(`${BASE_URL}/menus/delete/${menuId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting menu: ", error);
    throw error;
  }
};

// Obtenir un Item par ID (Produit ou Menu)
export async function getItemById(type, id) {
  // Guard clause to avoid hitting /undefined
  if (!type || !id) {
    console.warn("Invalid type or id in getItemById:", { type, id });
    return null; 
  }

  try {
    let response = null;

    if (type === "Menu") {
      response = await fetch(`${BASE_URL}/menus/${id}`);
    } else if (type === "Product") {
      response = await fetch(`${BASE_URL}/products/${id}`);
    } else {
      console.warn(`Unknown onModel type: ${type}. Expected "Menu" or "Product"`);
      return null;
    }

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${type} by ID (${id}): `, error);
    throw error;
  }
}

// Valider une Commande
export const submitOrder = async (orderPayload) => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
};

// Créer un Produit
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating product: ", error);
    throw error;
  }
};

// Créer un Menu
export const createMenu = async (menuData) => {
  try {
    const response = await fetch(`${BASE_URL}/menus/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating menu: ", error);
    throw error;
  }
}

export const updateItem = async (type, id, updatedItem, authToken) => {
  const endpoint =
    type === "Menu" ? `menus/modify/${id}` : `products/modify/${id}`;
  try {
    console.log(`Updating ${type} at endpoint: ${endpoint}`);
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating ${type} by id (${id}): `, error);
    throw error;
  }
};