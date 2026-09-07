import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCg8K-ZbaIDuW3KosY-S9R0QE8vyF2Tjh0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mochi-products.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://mochi-products-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mochi-products",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mochi-products.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
