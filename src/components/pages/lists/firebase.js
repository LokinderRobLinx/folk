// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyA-8od_x3DuHwtXCAfPvQJrdJ8j53T-qKE",
//   authDomain: "todo-79707.firebaseapp.com",
//   projectId: "todo-79707",
//   storageBucket: "todo-79707.appspot.com",
//   messagingSenderId: "742530643649",
//   appId: "1:742530643649:web:f7533b1d4b7ab21ce5c640",
//   measurementId: "G-7WF21F4RER"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCa-_PptyWWcLmMhnB20hBjWRBMvYw1lZA",
  authDomain: "folkras-c20de.firebaseapp.com",
  projectId: "folkras-c20de",
  storageBucket: "folkras-c20de.appspot.com",
  messagingSenderId: "310912347808",
  appId: "1:310912347808:web:ea1e04dd1493588c71e3c5",
  measurementId: "G-DK8QYX5P8F"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);