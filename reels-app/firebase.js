// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7-LbRq-Yd5ozl0lkuv5YptNBuxwjBuLg",
  authDomain: "reels-app-1658d.firebaseapp.com",
  projectId: "reels-app-1658d",
  storageBucket: "reels-app-1658d.appspot.com",
  messagingSenderId: "634181823971",
  appId: "1:634181823971:web:2264628cac04fc7792c4d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app)
export { auth, storage};