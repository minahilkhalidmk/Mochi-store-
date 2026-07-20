import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "----------------------------",
  authDomain: "mochi-products.firebaseapp.com",
  projectId: "mochi-products",
  databaseURL: "https://mochi-products-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function wipe() {
  try {
    await remove(ref(db, 'products'));
    console.log("Wiped bloated products!");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

wipe();
