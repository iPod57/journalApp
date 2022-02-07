
import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 
 
// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCFqCJqCWqGmP0Gw-TyscGx1ic5WjIarI0",
authDomain: "react-redux-24fc1.firebaseapp.com",
projectId: "react-redux-24fc1",
storageBucket: "react-redux-24fc1.appspot.com",
messagingSenderId: "627162544609",
appId: "1:627162544609:web:e4f0a4c9f828ddb89f7aa0"
};
 
// Initialize Firebase
initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}