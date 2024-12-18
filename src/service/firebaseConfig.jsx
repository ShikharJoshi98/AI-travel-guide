// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyXTBPOM73OxdE8LMhrr4SNpWxf65Zpj0",
  authDomain: "ai-travelguide.firebaseapp.com",
  projectId: "ai-travelguide",
  storageBucket: "ai-travelguide.firebasestorage.app",
  messagingSenderId: "1038229826550",
  appId: "1:1038229826550:web:15335a8c3d86f6a89cb5d7",
  measurementId: "G-LTPSBKP3JC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
// const analytics = getAnalytics(app);