const API_HOST =
  import.meta.env.DEV && import.meta.env.VITE_API_URL_LOCAL
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL || "http://localhost:2233";

const BASE_URL = `${API_HOST}/api`;

const request = async (endpoint, { method = "GET", body, authToken } = {}) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const error = new Error(
      errorPayload.message || `Error ${response.status}`
    );
    error.status = response.status;
    error.details = errorPayload;
    throw error;
  }

  return response.json();
};

// Afficher tous les Produits (hors Menus)
export const getAllItems = async (type) => {
  const query = type ? `?type=${encodeURIComponent(type)}` : "";
  return request(`/products${query}`);
};

// Afficher tous les Menus
export const getAllMenus = async () => request("/menus");

//Aficher le Menu par son ID
export const getMenuById = (menuId) => request(`/menus/${menuId}`);

// Actualiser les  informations d'un Produit (Pas Menu)
export const updateProduct = (productId, productData, authToken) =>
  request(`/products/modify/${productId}`, {
    method: "PUT",
    body: productData,
    authToken,
  });

//Supprimer un Produit (Pas Menu)
export const deleteProduct = (productId, authToken) =>
  request(`/products/delete/${productId}`, {
    method: "DELETE",
    authToken,
  });

// Actualiser un menu
export const updateMenu = (menuId, menuData, authToken) =>
  request(`/menus/modify/${menuId}`, {
    method: "PUT",
    body: menuData,
    authToken,
  });

//Supprimer un Menu
export const deleteMenu = (menuId, authToken) =>
  request(`/menus/delete/${menuId}`, {
    method: "DELETE",
    authToken,
  });

const resolveType = (type) => {
  const normalized = type?.toLowerCase();
  return normalized === "menu" ? "menu" : "product";
};

export async function getItemById(type, id) {
  if (!type || !id) {
    console.warn("Invalid type or id in getItemById:", { type, id });
    return null;
  }

  const normalizedType = resolveType(type);
  const endpoint =
    normalizedType === "menu" ? `/menus/${id}` : `/products/${id}`;

  try {
    return await request(endpoint);
  } catch (error) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Actualiser Menu ou Produit
export const updateItem = (type, id, updatedItem, authToken) => {
  const normalizedType = resolveType(type);
  const endpoint =
    normalizedType === "menu"
      ? `/menus/modify/${id}`
      : `/products/modify/${id}`;

  return request(endpoint, {
    method: "PUT",
    body: updatedItem,
    authToken,
  });
};

// Valider une Commande
export const submitOrder = (orderPayload, authToken) =>
  request("/orders/add", {
    method: "POST",
    body: orderPayload,
    authToken,
  });

// Créer un Produit
export const createProduct = (productData, authToken) =>
  request("/products/add", {
    method: "POST",
    body: productData,
    authToken,
  });

//Créer un Menu
export const createMenu = (menuData, authToken) =>
  request("/menus/add", {
    method: "POST",
    body: menuData,
    authToken,
  });

export const requestPasswordReset = (email) =>
  request("/users/forgot-password", {
    method: "POST",
    body: { email },
  });

export const resetPassword = ({ token, email, username, newPassword }) =>
  request("/users/reset-password", {
    method: "POST",
    body: {
      ...(token ? { token } : {}),
      ...(email ? { email } : {}),
      ...(username ? { username } : {}),
      newPassword,
    },
  });
