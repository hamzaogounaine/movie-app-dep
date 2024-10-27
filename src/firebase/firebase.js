// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwPtlbe4PZ4a24GSEr27TAIprTh1K3udU",
  authDomain: "login-test-c6109.firebaseapp.com",
  projectId: "login-test-c6109",
  storageBucket: "login-test-c6109.appspot.com",
  messagingSenderId: "738955742498",
  appId: "1:738955742498:web:bc94e697161bda6ded297b",
  measurementId: "G-23DBRQ7W6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth , app};