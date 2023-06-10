import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
export const auth = getAuth();