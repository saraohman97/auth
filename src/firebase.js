import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "llama-auth.firebaseapp.com",
  projectId: "llama-auth",
  storageBucket: "llama-auth.appspot.com",
  messagingSenderId: "664329307810",
  appId: "1:664329307810:web:6f5870ec9520b2e577f9fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth();
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);