// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebase } from '@firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '@firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =  {
  apiKey: "AIzaSyBTF0jiwp-bvl-9XWwEEwI5utkcrsXo1E0",
  authDomain: "instagram-clone-bc043.firebaseapp.com",
  projectId: "instagram-clone-bc043",
  storageBucket: "instagram-clone-bc043.appspot.com",
  messagingSenderId: "699159065696",
  appId: "1:699159065696:web:d943705f40ac61db40ff05"
};

// Initialize Firebase
export const secondaryApp = initializeApp(firebaseConfig, "Secondary");
export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const auth = getAuth(app);
export const secondAuth = getAuth(secondaryApp);
export const storage = getStorage(app)