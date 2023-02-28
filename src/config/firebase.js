import { initializeApp } from "firebase/app";

import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";

import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
  where,
  batch
} from 'firebase/firestore';

import { getStorage } from "firebase/storage";

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

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async(userAuth, additionalInfo={}) => {
  if(!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if(!userSnapShot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
          await setDoc(userDocRef, {
              displayName,
              email,
              createdAt,
              ...additionalInfo
          })
      } catch(error){
          console.log('error creating user', error.message);
      }
  }

  return userDocRef;
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const addDocuments = async (key, objectsToAdd) => {
  objectsToAdd.forEach((object) => {
      createDocument(key, object)
  });
}

export const getAllDocuments = async (key) => {
  const collectionRef = collection(db, key);
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  
  return querySnapShot.docs.map((docSnapShot) => docSnapShot.data());
}

export const getPublishedDocuments = async (key, timestamp) => {
  const nowTimestamp = new Date().getTime();
  const collectionRef = collection(db, key);
  const q = query(collectionRef,
    where("datePublished", "<=", nowTimestamp),
    where("published", "==", true)
  );
  
  const querySnapShot = await getDocs(q);
  
  return querySnapShot.docs.map((docSnapShot) => docSnapShot.data());
}

export const getFeaturedDocuments = async (key, timestamp) => {
  const nowTimestamp = new Date().getTime();
  const collectionRef = collection(db, key);
  const q = query(collectionRef,
    where("datePublished", "<=", nowTimestamp),
    where("published", "==", true),
    where("featured", "==", true)
  );
  
  const querySnapShot = await getDocs(q);
  
  return querySnapShot.docs.map((docSnapShot) => docSnapShot.data());
}

export const createDocument = async (key, document) => {
  const docRef = await addDoc(collection(db, key), document);
  document.id = docRef.id;
  try {
      await setDoc(docRef, document);
  } catch(error){
      console.log('error creating document', error.message);
  }
  const newDoc = await getDoc(docRef);
  return newDoc.data();
}

export const readDocument = async (key, docId) => {
  const docRef = doc(db, key, docId);
  const response = await getDoc(docRef);
  return response.data();
}

export const updateDocument = async (key, document) => {
  const docRef = doc(db, key, document.id);
  try {
      await setDoc(docRef, document);
  } catch(error){
      console.log('error updating document', error.message);
  }
  const newDoc = await getDoc(docRef);
  return newDoc.data();
}

export const deleteDocument = async (key, document) => {
  const docRef = doc(db, key, document.id);
  try {
      await deleteDoc(docRef, document);
  } catch(error){
      console.log('error deleting document', error.message);
  }
  return docRef.id;
}