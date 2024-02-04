// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "heavenhub-29.firebaseapp.com",
  projectId: "heavenhub-29",
  storageBucket: "heavenhub-29.appspot.com",
  messagingSenderId: "892523592938",
  appId: "1:892523592938:web:f9d211fd2b9fa379dd6b93",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
