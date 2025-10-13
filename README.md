# 🍔 Burger Town - Frontend

## 📋 Table des matières
- [Vue d'ensemble](#-vue-densemble)
- [Architecture](#-architecture)
- [Technologies utilisées](#-technologies-utilisées)
- [Structure du projet](#-structure-du-projet)
- [Pages principales](#-pages-principales)
- [Gestion de l'état](#-gestion-de-létat)
- [Communication avec l'API](#-communication-avec-lapi)
- [Installation](#-installation)
- [Déploiement](#-déploiement)

---

## 🎯 Vue d'ensemble

Le frontend de **Burger Town** est une application web moderne développée avec **React** et **Vite**. Elle offre une interface utilisateur intuitive et réactive pour commander des burgers, consulter le menu, gérer son compte et administrer le restaurant.

**Fonctionnalités principales :**
- Navigation fluide avec React Router
- Catalogue de produits et menus interactif
- Panier dynamique avec persistance (localStorage)
- Authentification utilisateur (connexion/inscription)
- Espace administrateur pour gérer produits et menus
- Interface responsive (mobile, tablette, desktop)
- Animations avec Framer Motion
- Notifications avec React Toastify

---

## 🏗️ Architecture

L'application suit une architecture **composants React** avec un système de routing centralisé.

```
Front/
├── src/
│   ├── main.jsx                 # Point d'entrée + Configuration du Router
│   ├── App.jsx                  # Composant racine avec Layout (Navbar + Footer)
│   ├── components/              # Composants réutilisables
│   │   ├── Navbar.jsx           # Barre de navigation
│   │   └── Footer.jsx           # Pied de page
│   ├── pages/                   # Pages de l'application
│   │   ├── Homepage.jsx         # Page d'accueil
│   │   ├── Carte.jsx            # Menu complet
│   │   ├── LesProduits.jsx      # Liste des produits par catégorie
│   │   ├── Produit.jsx          # Détail d'un produit
│   │   ├── Menu.jsx             # Détail d'un menu
│   │   ├── CartAndOrderSummary.jsx  # Panier et récapitulatif
│   │   ├── successPage.jsx      # Confirmation de commande
│   │   ├── SignIn.jsx           # Connexion
│   │   ├── CreateAccount.jsx    # Inscription
│   │   ├── Account.jsx          # Compte utilisateur
│   │   ├── NotFound.jsx         # Page 404
│   │   └── admin/               # Pages d'administration
│   │       ├── Admin.jsx        # Dashboard admin
│   │       ├── CreateProductForm.jsx
│   │       ├── CreateMenuForm.jsx
│   │       ├── EditItem.jsx
│   │       └── EditItemForm.jsx
│   ├── functions/               # Fonctions utilitaires
│   │   └── frontFunctions.js    # Helpers frontend
│   ├── assets/                  # Styles et ressources
│   │   ├── App.css
│   │   ├── navbar.css
│   │   └── homepage.css
│   └── public/                  # Fichiers statiques (images, icônes)
├── index.html                   # Template HTML
├── vite.config.js               # Configuration Vite
└── package.json
```

### Flux de navigation

```
Utilisateur
    ↓
[URL demandée]
    ↓
React Router (main.jsx)
    ↓
[Correspondance de route]
    ↓
Page Component (Homepage, Carte, Produit...)
    ↓
[Interactions utilisateur]
    ↓
[Mise à jour de l'état (useState)]
    ↓
[Appel API fetch vers le backend]
    ↓
Backend API (https://back-cold-morning-3477.fly.dev)
    ↓
[Réponse JSON]
    ↓
[Mise à jour de l'état + localStorage]
    ↓
[Re-render de l'interface]
```

---

## 🛠️ Technologies utilisées

| Technologie | Usage |
|------------|-------|
| **React 18** | Bibliothèque pour construire l'interface utilisateur |
| **Vite** | Bundler ultra-rapide pour le développement et la production |
| **React Router DOM** | Gestion du routing côté client (SPA) |
| **Axios** | Client HTTP pour les appels API |
| **Framer Motion** | Bibliothèque d'animations fluides |
| **React Toastify** | Notifications toast élégantes |
| **Swiper** | Carrousel/slider tactile |
| **React Swipeable** | Gestion des gestes de swipe |
| **localStorage** | Persistance des données côté client (panier, utilisateur) |
| **CSS3** | Styles personnalisés |

---

## 🗂️ Structure du projet

### Composants principaux

#### 1. **main.jsx** - Point d'entrée
C'est le cœur de l'application. Il configure :
- Le **routeur** avec toutes les routes
- La **gestion de l'état global** (panier, utilisateur)
- Les **fonctions de manipulation** (ajout au panier, connexion, déconnexion)

**État global géré :**
```javascript
- cartItems : tableau des articles dans le panier
- user : objet utilisateur connecté (ou null)
- nextUniqueId : ID unique pour chaque article du panier
```

**Fonctions principales :**
```javascript
- addToCart(item) : Ajoute un article au panier
- updateCart(updatedItem) : Met à jour un article
- removeItemFromCart(uniqueId) : Supprime un article
- clearCart() : Vide le panier
- handleUserLogin(userData) : Gère la connexion
- handleUserLogout() : Gère la déconnexion
```

#### 2. **App.jsx** - Layout
Définit la structure globale de l'application :
```jsx
<Navbar /> (en-tête avec navigation)
<Outlet /> (contenu de la page courante)
<Footer /> (pied de page)
```

#### 3. **Navbar.jsx** - Navigation
Barre de navigation responsive avec :
- Logo et liens principaux
- Indicateur de panier (nombre d'articles)
- Menu utilisateur (connexion/déconnexion)
- Menu burger pour mobile

#### 4. **Footer.jsx** - Pied de page
Informations de contact, liens légaux, réseaux sociaux.

---

## 📄 Pages principales

### Pages publiques (accessibles sans authentification)

| Page | Route | Description |
|------|-------|-------------|
| **Homepage** | `/` | Page d'accueil avec présentation et promotions |
| **Carte** | `/carte` | Menu complet avec tous les produits et menus |
| **LesProduits** | `/produits/:categoryName` | Liste des produits par catégorie (Burgers, Boissons, etc.) |
| **Produit** | `/product/:productId` | Détail d'un produit avec option d'ajout au panier |
| **Menu** | `/menu/:menuId` | Détail d'un menu avec sélection de taille et ajout au panier |
| **CartAndOrderSummary** | `/commande` | Panier et récapitulatif de la commande |
| **SuccessPage** | `/orderconfirmation` | Confirmation de commande réussie |
| **SignIn** | `/connexion` | Connexion utilisateur |
| **CreateAccount** | `/inscription` | Création de compte |

### Pages protégées (nécessitent une authentification)

| Page | Route | Protection | Description |
|------|-------|-----------|-------------|
| **Account** | `/mon-compte` | User | Profil et informations de l'utilisateur |
| **Admin** | `/admin` | Admin | Dashboard administrateur |
| **CreateProduct** | `/create-product` | Admin | Formulaire de création de produit |
| **CreateMenu** | `/create-menu` | Admin | Formulaire de création de menu |
| **EditItem** | `/admin/edit/:type/:itemId` | Admin | Édition d'un produit ou menu |

### Page d'erreur

| Page | Route | Description |
|------|-------|-------------|
| **NotFound** | `*` | Page 404 pour les routes inexistantes |

---

## 🔄 Gestion de l'état

L'application utilise plusieurs stratégies de gestion de l'état :

### 1. **État local (useState)**
Utilisé dans chaque composant pour gérer les données temporaires :
```javascript
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
```

### 2. **État global (props drilling)**
L'état du panier et de l'utilisateur est géré dans `main.jsx` et passé aux composants enfants via les props :
```javascript
// Dans main.jsx
const [cartItems, setCartItems] = useState([]);
const [user, setUser] = useState(null);

// Passé aux composants
<CartAndOrderSummary
  cartItems={cartItems}
  clearCart={clearCart}
  user={user}
/>
```

### 3. **Persistance (localStorage)**
Les données critiques sont sauvegardées dans le localStorage pour survivre aux rechargements de page :

```javascript
// Sauvegarde
localStorage.setItem('cartItems', JSON.stringify(cartItems));
localStorage.setItem('user', JSON.stringify(user));
localStorage.setItem('userToken', token);

// Récupération au démarrage
const savedCartItems = localStorage.getItem('cartItems');
const savedUser = localStorage.getItem('user');
```

**Données persistées :**
- `cartItems` : Articles du panier
- `user` : Informations de l'utilisateur connecté
- `userToken` : Token JWT pour l'authentification

### 4. **Événements personnalisés**
Pour communiquer entre composants non liés :
```javascript
// Émission
window.dispatchEvent(new CustomEvent('loginStateChanged', { detail: userData }));

// Écoute
window.addEventListener('loginStateChanged', handleLoginChange);
```

---

## 🌐 Communication avec l'API

### Configuration

Les URLs de l'API sont définies dans `.env` :
```env
VITE_API_URL_LOCAL=http://localhost:2233
VITE_API_URL=https://back-cold-morning-3477.fly.dev
```

Utilisation dans le code :
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

### Appels API courants

#### 1. Récupérer tous les produits
```javascript
const response = await fetch(`${API_URL}/api/products`);
const products = await response.json();
```

#### 2. Connexion utilisateur
```javascript
const response = await fetch(`${API_URL}/api/users/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});
const data = await response.json();
localStorage.setItem('userToken', data.token);
```

#### 3. Créer une commande
```javascript
const response = await fetch(`${API_URL}/api/orders/add`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: cartItems, totalPrice, customer: user._id })
});
```

#### 4. Créer un produit (admin)
```javascript
const response = await fetch(`${API_URL}/api/products/add`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
  },
  body: JSON.stringify(productData)
});
```

### Gestion des erreurs

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  // Traitement des données
} catch (error) {
  console.error('Erreur:', error);
  // Affichage d'un toast d'erreur
  toast.error('Une erreur est survenue');
}
```

---

## 🚀 Installation

### Prérequis
- **Node.js** (v14 ou supérieur)
- **npm** ou **yarn**

### Étapes

1. **Cloner le repository**
   ```bash
   cd Front
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**

   Créer un fichier `.env` à la racine du dossier `Front/` :
   ```env
   VITE_API_URL_LOCAL=http://localhost:2233
   VITE_API_URL=https://back-cold-morning-3477.fly.dev
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

   L'application sera accessible à : `http://localhost:5173`

5. **Build pour la production**
   ```bash
   npm run build
   ```

   Les fichiers optimisés seront générés dans le dossier `dist/`.

6. **Preview du build de production**
   ```bash
   npm run preview
   ```

---

## 🌐 Déploiement

L'application est déployée sur **Vercel** (plateforme optimisée pour React/Vite).

### Configuration Vercel

Le fichier `vercel.json` contient la configuration :
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
Cette configuration permet le routing côté client (SPA) de fonctionner correctement.

### Déployer sur Vercel

#### Méthode 1 : Via l'interface web
1. Aller sur https://vercel.com
2. Connecter le repository GitHub
3. Vercel détecte automatiquement Vite
4. Configurer les variables d'environnement :
   - `VITE_API_URL` = `https://back-cold-morning-3477.fly.dev`
5. Déployer

#### Méthode 2 : Via la CLI
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

### URL de production
Une fois déployé, l'application est accessible à :
```
https://burger-house-front.vercel.app
```

---

## 🔗 Relation avec le Backend

```
┌────────────────────────────────────────────────────────────────┐
│                    FLUX COMPLET DE L'APPLICATION               │
└────────────────────────────────────────────────────────────────┘

Utilisateur (Navigateur)
        ↓
    [Action : "Commander un burger"]
        ↓
Frontend React (https://burger-house-front.vercel.app)
    │
    ├─ Composant Produit.jsx
    │   └─ Clique sur "Ajouter au panier"
    │       └─ addToCart(item) appelé
    │           └─ Mise à jour de cartItems (useState)
    │               └─ Sauvegarde dans localStorage
    │
    ├─ Composant CartAndOrderSummary.jsx
    │   └─ Clique sur "Valider la commande"
    │       └─ fetch POST vers /api/orders/add
    │
    ↓ Requête HTTP POST
    │
Backend API (https://back-cold-morning-3477.fly.dev)
    │
    ├─ CORS Middleware (autorise les requêtes de Vercel)
    ├─ Route /api/orders/add
    ├─ Controller orderController.submitBackOrder
    │   └─ Validation des données
    │   └─ Création d'un document Order
    │       └─ order.save()
    │
    ↓ Requête Mongoose
    │
MongoDB Atlas (mongodb+srv://...)
    │
    └─ Collection orders
        └─ Document inséré avec :
            {
              items: [...],
              totalPrice: 25.50,
              status: "pending",
              customer: ObjectId("...")
            }
    ↓
    [Réponse JSON]
    ↓
Frontend
    │
    └─ Réception de la réponse
        └─ Redirection vers /orderconfirmation
        └─ Affichage du toast de succès
        └─ Vidage du panier (clearCart)
```

### Sécurité CORS

Le backend autorise explicitement les requêtes du frontend Vercel :
```javascript
// Backend - src/index.js
app.use(cors({
  origin: "https://burger-house-front.vercel.app"
}));
```

---

## 🎨 Fonctionnalités clés

### 1. Panier dynamique
- Ajout/suppression d'articles
- Modification des quantités
- Calcul automatique du total
- Persistance entre les sessions

### 2. Authentification
- Connexion avec JWT
- Inscription de nouveaux utilisateurs
- Protection des routes admin
- Déconnexion avec nettoyage du localStorage

### 3. Espace administrateur
- Création de produits et menus
- Édition des articles existants
- Suppression d'articles
- Gestion des stocks (inStock)

### 4. Interface responsive
- Design mobile-first
- Menu burger pour mobile
- Cartes de produits adaptatives
- Formulaires optimisés pour tactile

### 5. Animations
- Transitions fluides entre les pages
- Animations de chargement
- Feedback visuel sur les interactions
- Carrousel de produits avec Swiper

---

## 📝 Notes importantes

### Performance
- **Code splitting** : Chaque page est un composant séparé
- **Lazy loading** : Les images sont chargées à la demande
- **Vite HMR** : Rechargement ultra-rapide en développement

### Accessibilité
- Utilisation de balises sémantiques HTML5
- Attributs `alt` sur toutes les images
- Navigation au clavier

### Sécurité
- Validation côté client ET serveur
- Tokens JWT sécurisés
- Protection contre les XSS (React échappe automatiquement)
- HTTPS en production

---

## 🐛 Debugging

### Vérifier les appels API
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### Vérifier le localStorage
```javascript
console.log('Cart:', localStorage.getItem('cartItems'));
console.log('User:', localStorage.getItem('user'));
console.log('Token:', localStorage.getItem('userToken'));
```

### Vérifier l'état du panier
Ouvrir les React DevTools et inspecter l'état de `AppRouter`.

---

## 🤝 Contribution

Pour contribuer au projet :
1. Respecter la structure des composants
2. Utiliser des noms de variables descriptifs
3. Commenter les fonctions complexes
4. Tester sur mobile et desktop

---

## 📚 Ressources

- **React** : https://react.dev
- **Vite** : https://vitejs.dev
- **React Router** : https://reactrouter.com
- **Framer Motion** : https://www.framer.com/motion
- **Vercel** : https://vercel.com/docs

---

**Bon développement ! 🍔✨**
