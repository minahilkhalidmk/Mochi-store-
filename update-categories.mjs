import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCg8K-ZbaIDuW3KosY-S9R0QE8vyF2Tjh0",
  authDomain: "mochi-products.firebaseapp.com",
  projectId: "mochi-products",
  databaseURL: "https://mochi-products-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function updateCategories() {
  try {
    const snapshot = await get(ref(db, 'products'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        if (!data[key].category) {
          const cat = data[key].title.includes('Vase') ? 'Ceramics' : 'Decor';
          await update(ref(db, `products/${key}`), { category: cat });
          console.log(`Updated ${key} to category ${cat}`);
        }
      }
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

updateCategories();
