import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdgA-ph58r-X9l62tPy5B2xj6GZnwQWMM",
  authDomain: "todo-app-21d70.firebaseapp.com",
  projectId: "todo-app-21d70",
  storageBucket: "todo-app-21d70.appspot.com",
  messagingSenderId: "726521841517",
  appId: "1:726521841517:web:f678fb1a8dbc09d236bc64",
  measurementId: "G-PRHP9XC83C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
