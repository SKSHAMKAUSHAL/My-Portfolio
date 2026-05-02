import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app, db, storage;

try {
  // Only initialize if we have an API key (meaning you've pasted your config)
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "your_api_key" && firebaseConfig.apiKey !== '"your_api_key"') {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { app, db, storage };

// Helper function to sign in using the secret key approach
export const loginWithSecret = async (secretKey) => {
  // Vite sometimes keeps quotes from .env, so we remove them if they exist
  let correctSecret = import.meta.env.VITE_ADMIN_SECRET_KEY || "";
  correctSecret = correctSecret.replace(/^["']|["']$/g, '').trim(); 
  
  // Normalize smart quotes to standard straight quotes
  const normalizedInput = secretKey.trim().replace(/['`’‘]/g, "'");
  const normalizedSecret = correctSecret.replace(/['`’‘]/g, "'");
  
  if (normalizedInput === normalizedSecret) {
    return true;
  }
  
  console.log("Login Failed. (If you just updated .env, you MUST restart your terminal server and refresh the browser!)");
  return false;
};
