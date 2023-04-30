import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD81gI4AD72VQKzGyMq4j_6o-my9RcPb-I",
  authDomain: "my-portfolio-db-4f84e.firebaseapp.com",
  projectId: "my-portfolio-db-4f84e",
  storageBucket: "my-portfolio-db-4f84e.appspot.com",
  messagingSenderId: "661041310801",
  appId: "1:661041310801:web:8d6b177c5e6b92f87c1c70",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
