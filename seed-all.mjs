import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCg8K-ZbaIDuW3KosY-S9R0QE8vyF2Tjh0",
  authDomain: "mochi-products.firebaseapp.com",
  projectId: "mochi-products",
  databaseURL: "https://mochi-products-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const allProducts = [
  {
    title: "Mochi Keyboard",
    description: "Luxurious minimalist mechanical keyboard with premium PBT keycaps.",
    price: 299.99,
    stockQuantity: 15,
    maxQuantityPerUser: 2,
    majorImageUrl: "/demo1.jpg",
    category: "Decor"
  },
  {
    title: "Ceramic Vase",
    description: "Elegant ceramic handcrafted vase. Raw and unglazed.",
    price: 150.00,
    stockQuantity: 5,
    maxQuantityPerUser: 1,
    majorImageUrl: "/demo2.jpg",
    category: "Ceramics"
  },
  {
    title: "Minimalist Lounge Chair",
    description: "A beautifully crafted lounge chair with clean lines, featuring an ash wood frame and soft cream boucle fabric. The perfect reading companion.",
    price: 850.00,
    stockQuantity: 4,
    maxQuantityPerUser: 1,
    majorImageUrl: "/demo3.jpg",
    category: "Furniture"
  },
  {
    title: "Matte Black Table Lamp",
    description: "A stark, modern table lamp finished in an ultra-matte black powder coat. Casts a warm, diffused ambient glow.",
    price: 120.00,
    stockQuantity: 12,
    maxQuantityPerUser: 2,
    majorImageUrl: "/minor1.jpg",
    category: "Lighting"
  },
  {
    title: "Textured Linen Throw",
    description: "Hand-woven from 100% natural European linen. Breathable, exceptionally soft, and adds effortless texture to any space.",
    price: 85.00,
    stockQuantity: 25,
    maxQuantityPerUser: 4,
    majorImageUrl: "/minor2.jpg",
    category: "Decor"
  },
  {
    title: "Stone Espresso Cups",
    description: "Unglazed raw stone exterior with a smooth, clear-glazed interior. These minimalist espresso cups elevate your morning ritual.",
    price: 45.00,
    stockQuantity: 30,
    maxQuantityPerUser: 4,
    majorImageUrl: "/minor3.jpg",
    category: "Ceramics"
  }
];

async function seedAll() {
  try {
    await remove(ref(db, 'products'));
    for (const p of allProducts) {
      const newRef = push(ref(db, 'products'));
      await set(newRef, p);
      console.log('Added product:', p.title);
    }
    console.log('Finished seeding all 6 products successfully!');
    process.exit(0);
  } catch(e) {
    console.error("Error seeding:", e.message);
    process.exit(1);
  }
}

seedAll();
