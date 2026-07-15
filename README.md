# 🏺 Mochi Store

> Elevate Your Space. Crafted with intention and designed for longevity.

Mochi is a modern, responsive, and blazing-fast e-commerce web application. Built with premium design aesthetics, it features a fully functional customer-facing storefront and a secure administrative dashboard for inventory management.

🔗 **Live Demo:** [https://mochi-store-4012e.web.app](https://mochi-store-4012e.web.app)

---

## ✨ Key Features

- **🛍️ Dynamic Storefront:** Browse products with beautiful, cinematic animations and responsive grids.
- **📱 Fully Responsive:** Mobile-first design featuring slide-out hamburger menus and intelligent layout adjustments for all screen sizes.
- **🛒 Persistent Cart:** A slide-out cart drawer that remembers user selections using LocalStorage.
- **🖼️ Multi-Image Gallery:** Products support up to 5 images (1 major hero image and 4 gallery thumbnails) that users can interact with.
- **🔐 Secure Admin Dashboard:** A protected portal for store owners to add, edit, and delete products, as well as view customer orders.
- **⚡ Client-Side Image Compression:** To keep the database lightning-fast, the Admin Dashboard automatically downscales and compresses uploaded images via an invisible HTML5 Canvas, converting them to Base64 text strings before saving them to Firebase.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (via Vite)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Database:** Firebase Realtime Database
- **Authentication:** Firebase Auth
- **Hosting:** Firebase Hosting

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Clone the Repository
If you are pulling this from Git, clone the repository and navigate into the project directory:
```bash
git clone <your-repository-url>
cd firebase-practice
```

### 2. Install Dependencies
Install all the required NPM packages to run the application:
```bash
npm install
```

### 3. Setup Firebase
This project relies on Firebase. The `src/firebase.js` file contains the API configuration. 
*Note: If you are setting up a brand new Firebase project, you will need to replace the configuration keys in `src/firebase.js` with your own.*

### 4. Run the Development Server
Start the local Vite development server:
```bash
npm run dev
```
The application will usually be available at `http://localhost:5173`. Open this URL in your browser to view the app!

---

## 📦 Deployment

When you are ready to push your latest code to the live internet, the process is handled in two steps:

1. **Build the production application:**
   This compiles and minimizes the code for maximum performance.
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting:**
   This uploads your compiled application directly to Google's servers.
   ```bash
   npx firebase-tools deploy --only hosting
   ```

*Shortcut (Windows PowerShell):*
```powershell
npm run build ; npx firebase-tools deploy --only hosting
```

---

## 📝 Database Architecture Notes

Because Firebase Realtime Database is a massive JSON tree, this application avoids using complex Storage Buckets for images. 
Instead, images uploaded via the Admin portal are converted directly into text (`Base64`) and saved alongside the product's title and price in the JSON tree. This guarantees instantaneous loading and significantly simplifies the database architecture!
