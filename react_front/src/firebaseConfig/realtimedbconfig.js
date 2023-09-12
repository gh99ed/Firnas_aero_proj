
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCkmDI4D_0s8tGxE4GLsEzhe0Hb2l_G-6A",
    authDomain: "firnas-aero-787a5.firebaseapp.com",
    projectId: "firnas-aero-787a5",
    storageBucket: "firnas-aero-787a5.appspot.com",
    messagingSenderId: "828055687156",
    appId: "1:828055687156:web:1c5d0835f08b4b4b4a33a1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const dataref=firebase.database();
export default firebase;
