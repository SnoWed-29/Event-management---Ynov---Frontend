// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyDnoU_-2Hf44sWWSp16_Z1vxg_GW923wX8",
  authDomain: "devapiproject-fc40c.firebaseapp.com",
  projectId: "devapiproject-fc40c",
  storageBucket: "devapiproject-fc40c.firebasestorage.app",
  messagingSenderId: "845585513899",
  appId: "1:845585513899:web:0106d707501b7a2952a6ee",
  measurementId: "G-EP9W42X02P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, analytics, auth };