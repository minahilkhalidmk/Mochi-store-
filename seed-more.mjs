import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCg8K-ZbaIDuW3KosY-S9R0QE8vyF2Tjh0",
  authDomain: "mochi-products.firebaseapp.com",
  projectId: "mochi-products",
  databaseURL: "https://mochi-products-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const moreProducts = [
  {
    title: "Minimalist Lounge Chair",
    description: "A beautifully crafted lounge chair with clean lines, featuring an ash wood frame and soft cream boucle fabric. The perfect reading companion.",
    price: 850.00,
    stockQuantity: 4,
    maxQuantityPerUser: 1,
    majorImageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop",
    category: "Furniture"
  },
  {
    title: "Matte Black Table Lamp",
    description: "A stark, modern table lamp finished in an ultra-matte black powder coat. Casts a warm, diffused ambient glow.",
    price: 120.00,
    stockQuantity: 12,
    maxQuantityPerUser: 2,
    majorImageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
    category: "Lighting"
  },
  {
    title: "Textured Linen Throw",
    description: "Hand-woven from 100% natural European linen. Breathable, exceptionally soft, and adds effortless texture to any space.",
    price: 85.00,
    stockQuantity: 25,
    maxQuantityPerUser: 4,
    majorImageUrl: "https://images.unsplash.com/photo-1580828369446-e41c4c1a5331?q=80&w=1000&auto=format&fit=crop",
    category: "Decor"
  },
  {
    title: "Stone Espresso Cups (Set of 2)",
    description: "Unglazed raw stone exterior with a smooth, clear-glazed interior. These minimalist espresso cups elevate your morning ritual.",
    price: 45.00,
    stockQuantity: 30,
    maxQuantityPerUser: 4,
    majorImageUrl: "https://images.unsplash.com/photo-1574888206109-1cdb71ec9831?q=80&w=1000&auto=format&fit=crop",
    category: "Ceramics"
  }
];

async function seedMore() {
  try {
    for (const p of moreProducts) {
      const newRef = push(ref(db, 'products'));
      await set(newRef, p);
      console.log('Added product:', p.title);
    }
    console.log('Seeding more complete!');
    process.exit(0);
  } catch(e) {
    console.error("Error seeding:", e.message);
    process.exit(1);
  }
}

seedMore();
