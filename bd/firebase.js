// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {collection, addDoc, getDocs,getCountFromServer, deleteDoc, doc, getDoc, updateDoc }        
    from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZigv2X5_57XfBkfE4zb2R2GobZ90igVI",
  authDomain: "proyectometodologias-2186a.firebaseapp.com",
  projectId: "proyectometodologias-2186a",
  storageBucket: "proyectometodologias-2186a.firebasestorage.app",
  messagingSenderId: "1035665597993",
  appId: "1:1035665597993:web:fd75c9d15de9988b7a5e38"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore
const auth = getAuth(app);