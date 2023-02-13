import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpxpc1t9dznc1ATHhBzua3sp19K9pKRaE",
  authDomain: "huffaker-hooligans.firebaseapp.com",
  projectId: "huffaker-hooligans",
  storageBucket: "huffaker-hooligans.appspot.com",
  messagingSenderId: "120477426261",
  appId: "1:120477426261:web:6c4a6e76ad0111f676eadc"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();