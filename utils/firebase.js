// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPIocSU5g7kukeslmjEMLT4pSt_8IQ8bs",
  authDomain: "dynamic-portfolio-4e5c6.firebaseapp.com",
  projectId: "dynamic-portfolio-4e5c6",
  storageBucket: "dynamic-portfolio-4e5c6.firebasestorage.app",
  messagingSenderId: "176791078032",
  appId: "1:176791078032:web:c40639fff7e13bc77d0415",
  measurementId: "G-J1SS1Q5X8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);