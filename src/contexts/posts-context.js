import { createContext, useState, useEffect } from 'react';

import { addDoc, doc, getDoc, getDocs, setDoc, deleteDoc, collection } from 'firebase/firestore';

import { db, auth } from '../config/firebase';

export const PostsContext = createContext(null);

export const PostsProvider = ({children}) => {
  const [ posts, setPosts ] = useState([]);

  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await getDocs(postCollectionRef);
    setPosts(response.docs.map((doc) => ({...doc.data(), id: doc.id})));
  };

  const getPost = async (postId) => {
    const docRef = doc(db, "posts", postId);
    const response = await getDoc(docRef);
    return response.data();
  }

  const createPost = async (post) => {
    await addDoc(postCollectionRef, {
      ...post, author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid
      }
    });
    getPosts();
  }

  const updatePost = async (post) => {
    const docRef = doc(db, "posts", post.id);
    await setDoc(docRef, {
      ...post, author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid
      }
    });
    getPosts();
  }

  const deletePost = async (postId) => {
    const postDoc = doc(db, "posts", postId);
    await deleteDoc(postDoc);
    getPosts();
  }

  const value = { posts, createPost, getPost, updatePost, deletePost };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}