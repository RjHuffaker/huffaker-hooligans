import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpxpc1t9dznc1ATHhBzua3sp19K9pKRaE",
  authDomain: "huffaker-hooligans.firebaseapp.com",
  projectId: "huffaker-hooligans",
  storageBucket: "huffaker-hooligans.appspot.com",
  messagingSenderId: "120477426261",
  appId: "1:120477426261:web:6c4a6e76ad0111f676eadc"
};

export const app = initializeApp(firebaseConfig);