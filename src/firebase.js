import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4VhfaG5l-g_49KUMN4Jt-npnZdMvCGSY",
  authDomain: "my-react-chat-room-7cf37.firebaseapp.com",
  projectId: "my-react-chat-room-7cf37",
  storageBucket: "my-react-chat-room-7cf37.appspot.com",
  messagingSenderId: "231344317068",
  appId: "1:231344317068:web:2e4d3da6ee795a0bc651a9",
  measurementId: "G-L2RXR0XT87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);