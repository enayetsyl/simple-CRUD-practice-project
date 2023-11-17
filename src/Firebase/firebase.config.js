// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPDd3sQragst4dXbfn3HNYsW8pUyju88M",
  authDomain: "simple-crud-practice-project.firebaseapp.com",
  projectId: "simple-crud-practice-project",
  storageBucket: "simple-crud-practice-project.appspot.com",
  messagingSenderId: "407866099407",
  appId: "1:407866099407:web:4ae4c43f982be9117f59ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

// when name the file start with small f
// config .env.local file also