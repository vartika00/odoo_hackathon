import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsIM_2LWKr9g4YxhIWmqVLoi5UmPf0loQ",
  authDomain: "atlas-b8cf1.firebaseapp.com",
  projectId: "atlas-b8cf1",
  storageBucket: "atlas-b8cf1.firebasestorage.app",
  messagingSenderId: "427626346619",
  appId: "1:427626346619:web:6d1bfff39eee8995218ade",
  measurementId: "G-J67BGTY298",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
