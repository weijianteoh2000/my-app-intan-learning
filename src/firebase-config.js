import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBa9pCedwqW9OLa8Su6e8bnX7SZ7Crn1nY",
  authDomain: "react-project-dc56e.firebaseapp.com",
  databaseURL: "https://react-project-dc56e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-project-dc56e",
  storageBucket: "react-project-dc56e.appspot.com",
  messagingSenderId: "111861838244",
  appId: "1:111861838244:web:cd3c37510f1427ab0e9131"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);