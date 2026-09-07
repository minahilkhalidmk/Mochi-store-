# 🏺 Mochi Store

<div align="center">

![Mochi Store Banner](https://img.shields.io/badge/Mochi-Store%20--%20Elevate%20Your%20Space-111111?style=for-the-badge&labelColor=000000)

**Elevate Your Space. Crafted with intention and designed for longevity.**

A premium, modern, minimalist e-commerce web application featuring a customer-facing storefront and a secure administrative dashboard.

[Live Demo](https://mochi-store-4012e.web.app) · [Explore Features](#-key-features) · [Setup Guide](#-getting-started) · [Database & Scripts](#-database-management--utility-scripts)

---

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

</div>

---

## 📖 Overview

**Mochi Store** is an ultra-sleek, responsive e-commerce web platform engineered for luxury lifestyle goods, minimalist home décor, and artisanal ceramics. Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Firebase**, Mochi combines high-end visual aesthetics with real-time data persistence, smooth page transitions, and an optimized administrative toolkit.

Whether browsing curated collections, managing cart state seamlessly across pages, tracking past orders, or populating inventory via a dedicated portal, Mochi provides an intuitive experience for both shoppers and store administrators.

---

## ✨ Key Features

### 🛍️ Storefront & Shopping Experience
- **Cinematic Visuals & Motion:** Powered by `Framer Motion` for smooth gallery renders, page transitions, and subtle hover animations.
- **Dynamic Collection & Search:** Instant text search and category filtering across furniture, lighting, ceramics, and décor.
- **Interactive Multi-Image Gallery:** Supports hero images alongside multi-angle gallery thumbnails for deep product inspection.
- **Persistent Cart Drawer:** Slide-out shopping cart driven by React Context API and local storage persistence.
- **Seamless Checkout:** Multi-step shipping and payment confirmation workflow with automatic order placement.

### 🔐 User & Order Portal
- **Firebase Authentication:** Multi-provider authentication supporting Email/Password sign-up/login and Google Auth.
- **Order Tracking:** Account page detailing order history, itemized breakdowns, total costs, and fulfillment status.

### ⚡ Admin Dashboard & Operations
- **Full Inventory CRUD:** Secure administrative control panel allowing store owners to add, update, and delete products.
- **Order Management System:** Real-time stream of incoming customer orders with status toggling (e.g., Pending, Processing, Shipped).
- **Client-Side Image Downscaling:** Built-in HTML5 Canvas engine automatically scales down uploaded images and converts them to optimized Base64 strings, ensuring snappy database saves without external cloud storage dependencies.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | Component-based UI library |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | Next-generation frontend tooling |
| **Routing** | [React Router v7](https://reactrouter.com/) | Client-side routing engine |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Production-ready motion engine for React |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean & consistent vector icons |
| **Database & Auth** | [Firebase Realtime DB & Auth](https://firebase.google.com/) | Live cloud database & user authentication |
| **Hosting** | [Firebase Hosting](https://firebase.google.com/docs/hosting) | Production static & dynamic web hosting |

---

## 📂 Project Architecture

```
Mochi-store/
├── public/                 # Static public assets & demo fallback images
├── src/
│   ├── api/                # API wrappers & data fetching utilities
│   ├── components/         # Reusable UI elements
│   │   ├── CartDrawer.jsx  # Slide-out persistent shopping cart
│   │   ├── Navbar.jsx      # Sticky top navigation bar & mobile menu
│   │   ├── ProductCard.jsx # Product card grid tile component
│   │   └── ProductGrid.jsx # Responsive product grid wrapper
│   ├── context/            # Global React Context providers
│   │   └── CartContext.jsx # Cart state management & local storage sync
│   ├── pages/              # Application views / routes
│   │   ├── Home.jsx            # Landing page hero & featured products
│   │   ├── About.jsx           # Brand philosophy & story
│   │   ├── Collection.jsx      # Catalog listing with search & category filters
│   │   ├── ProductDetails.jsx  # Detailed view with multi-image gallery
│   │   ├── Checkout.jsx        # Cart checkout & address details
│   │   ├── Orders.jsx          # Customer order history tracking
│   │   ├── Login.jsx           # User sign-in page
│   │   ├── Register.jsx        # Account registration page
│   │   ├── UserDashboard.jsx   # Customer profile & summary
│   │   └── AdminDashboard.jsx  # Inventory CRUD & order management
│   ├── App.jsx             # Main application layout & route setup
│   ├── firebase.js         # Firebase SDK initialization & export handles
│   ├── index.css           # Global Tailwind CSS imports & theme overrides
│   └── main.jsx            # Vite entry point
├── seed.mjs                # Script to seed sample single product data
├── seed-all.mjs            # Script to wipe and seed catalog with 6 products
├── seed-more.mjs           # Script to push additional demo products
├── update-categories.mjs   # Script to update category taxonomy in database
├── wipe.mjs                # Script to clear products node in Firebase DB
├── firebase.json           # Firebase Hosting deployment configuration
├── vite.config.js          # Vite plugin configuration
└── package.json            # Dependencies & build scripts
```

---

## 🚀 Getting Started

Follow these steps to run **Mochi Store** locally on your machine.

### Prerequisites

Ensure you have the following tools installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/minahilkhalidmk/Mochi-store-.git
cd Mochi-store-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📊 Database Management & Utility Scripts

The project includes several automation scripts to quickly seed or reset your Firebase Realtime Database instance:

| Command | Action |
| :--- | :--- |
| `node seed-all.mjs` | Wipes the `products` node and seeds 6 curated luxury products. |
| `node seed-more.mjs` | Appends additional demo products without overwriting existing data. |
| `node update-categories.mjs` | Normalizes and updates category keys across existing products. |
| `node wipe.mjs` | Clears all data inside the `products` database node. |

---

## 📦 Production & Deployment

### Build for Production

Compile and bundle the project for optimal performance:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Deploy to Firebase Hosting

Deploy the compiled build to Firebase Hosting:

```bash
npx firebase-tools deploy --only hosting
```

---

## 💡 Architecture & Performance Highlights

- **Client-Side Image Canvas Downscaling:** Uploading high-res images in e-commerce can degrade Realtime DB performance. Mochi downscales images dynamically via an in-memory HTML5 Canvas element before encoding to Base64, yielding lightweight text strings optimized for instant retrieval.
- **Cart Synchronization:** Shopping cart items automatically synchronize across tabs and persist upon refresh via `LocalStorage` coupled with React Context listeners.
- **Mobile-First Responsive Layouts:** Flexible grid layouts built with Tailwind CSS adapt seamlessly to mobile, tablet, and desktop viewports.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with ❤️ by <a href="https://github.com/minahilkhalidmk">Minahil Khalid</a></sub>
</div>
