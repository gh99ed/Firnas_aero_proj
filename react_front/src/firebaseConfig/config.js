// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkmDI4D_0s8tGxE4GLsEzhe0Hb2l_G-6A",
    authDomain: "firnas-aero-787a5.firebaseapp.com",
    projectId: "firnas-aero-787a5",
    storageBucket: "firnas-aero-787a5.appspot.com",
    messagingSenderId: "828055687156",
    appId: "1:828055687156:web:1c5d0835f08b4b4b4a33a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app)
export const firestoreStorage = getFirestore(app)

export const db = getFirestore(app);