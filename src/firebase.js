import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Realtime Database ke liye
import { getAuth } from "firebase/auth";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhmP6QH0D2rDWUoNhchvqDW0TOv-GMmls",
  authDomain: "health-web-d0eb2.firebaseapp.com",
  databaseURL: "https://health-web-d0eb2-default-rtdb.firebaseio.com/", // **<-- Maine aapke naye Project ID se yeh add kiya hai**
  projectId: "health-web-d0eb2",
  storageBucket: "health-web-d0eb2.firebasestorage.app",
  messagingSenderId: "78485314901",
  appId: "1:78485314901:web:879bf59e71c58155fb23dc",
  measurementId: "G-V5JYKFZF7L" // Agar aap Analytics use karte hain
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export services
export const database = getDatabase(app);
export const auth = getAuth(app);