import { createContext, useContext, useState, useEffect } from 'react';

import {
  getAllDocuments,
  getPublishedDocuments,
  getFeaturedDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  readDocument
} from '../config/firebase';

import { UserContext } from "./user-context";

export const PostsContext = createContext({
  allPosts: []
});

export const PostsProvider = ({children}) => {
  const { currentUser } = useContext(UserContext);

  const [ allPosts, setAllPosts ] = useState([]);

  const [ featuredPosts, setFeaturedPosts ] = useState([]);

  useEffect(() => {
    getAllPosts();
    getFeaturedPosts();
  }, [currentUser]);

  const getAllPosts = async () => {
    const allPosts = currentUser
       ? await getAllDocuments('posts')
       : await getPublishedDocuments('posts');
    setAllPosts(allPosts);
  }

  const getFeaturedPosts = async () => {
    const featuredPosts = await getFeaturedDocuments('posts');
    setFeaturedPosts(featuredPosts);
  }

  const getPost = async (postId) => {
    return await readDocument("posts", postId);
  }

  const createPost = async (post) => {
    const dateCreated = new Date().getTime();
    const dateModified = new Date().getTime();

    const newPost = await createDocument("posts", {
      ...post,
      dateCreated: dateCreated,
      dateModified: dateModified,
      author: {
          name: currentUser.displayName,
          id: currentUser.uid
      }
    });
    setAllPosts([...allPosts, newPost]);
  }

  const updatePost = async (post) => {
    const dateModified = new Date().getTime();

    const postToUpdate = await updateDocument('posts', {
      ...post,
          dateModified: dateModified,
          author: {
          name: currentUser.displayName,
          id: currentUser.uid
      }
    });

    const index = allPosts.findIndex(obj => obj.id === postToUpdate.id);
  
    if (index !== -1) {
      setAllPosts(oldPosts => {
        const newPosts = [...oldPosts];
        newPosts[index] = postToUpdate;
        return [...newPosts];
      });
    } else {
      console.error('Post not found in memory');
    }
  }

  const deletePost = async (post) => {
    const deletedPostId = await deleteDocument('posts', post);
    const index = allPosts.findIndex(obj => obj.id === deletedPostId);
    if (index !== -1) {
      setAllPosts((allPosts) => allPosts.filter((post) => post.id !== deletedPostId));
    } else {
      console.error('Post not found in memory');
    }
  }

  const value = { allPosts, featuredPosts, createPost, getPost, updatePost, deletePost };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}