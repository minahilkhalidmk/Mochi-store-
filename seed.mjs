import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import fs from 'fs';

const firebaseConfig = {
  apiKey: "AIzaSyCg8K-ZbaIDuW3KosY-S9R0QE8vyF2Tjh0",
  authDomain: "mochi-products.firebaseapp.com",
  projectId: "mochi-products",
  databaseURL: "https://mochi-products-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const b64_1 = '/demo1.jpg';
const b64_2 = '/demo2.jpg';

const products = [
  {
    title: "Mochi Keyboard",
    description: "Luxurious minimalist mechanical keyboard",
    price: 299.99,
    stockQuantity: 15,
    maxQuantityPerUser: 2,
    majorImageUrl: b64_1,
    category: "Decor"
  },
  {
    title: "Ceramic Vase",
    description: "Elegant ceramic handcrafted vase",
    price: 150.00,
    stockQuantity: 5,
    maxQuantityPerUser: 1,
    majorImageUrl: b64_2,
    category: "Ceramics"
  }
];

async function seed() {
  try {
    for (const p of products) {
      const newRef = push(ref(db, 'products'));
      await set(newRef, p);
      console.log('Added product:', p.title);
    }
    console.log('Seeding complete!');
    process.exit(0);
  } catch(e) {
    console.error("Error seeding:", e.message);
    process.exit(1);
  }
}

seed();
