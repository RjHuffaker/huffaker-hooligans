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

import { app } from "./firebase";

export const db = getFirestore(app);

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
  } catch (error) {
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
  } catch (error) {
    console.log('error updating document', error.message);
  }
  const newDoc = await getDoc(docRef);
  return newDoc.data();
}

export const deleteDocument = async (key, document) => {
  const docRef = doc(db, key, document.id);
  try {
    await deleteDoc(docRef, document);
  } catch (error) {
    console.log('error deleting document', error.message);
  }
  return docRef.id;
}