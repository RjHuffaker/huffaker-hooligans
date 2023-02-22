import { createContext, useContext, useState, useEffect } from 'react';

import {
  getAllDocuments,
  getPublishedDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  readDocument
} from '../config/firebase';

import { UserContext } from "./user-context";

export const PostsContext = createContext({
  posts: []
});

export const PostsProvider = ({children}) => {
  const { currentUser } = useContext(UserContext);

  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    if(currentUser){
      getAllPosts();
    } else {
      getPublishedPosts();
    }

  }, [currentUser]);

  const getAllPosts = async () => {
    const allPosts = await getAllDocuments('posts');
    setPosts(allPosts);
  }

  const getPublishedPosts = async () => {
    const publishedPosts = await getPublishedDocuments('posts');
    setPosts(publishedPosts);
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
    setPosts([...posts, newPost]);
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

    const index = posts.findIndex(obj => obj.id === postToUpdate.id);
  
    if (index !== -1) {
      setPosts(oldPosts => {
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
    const index = posts.findIndex(obj => obj.id === deletedPostId);
    if (index !== -1) {
      setPosts((posts) => posts.filter((post) => post.id !== deletedPostId));
    } else {
      console.error('Post not found in memory');
    }
  }

  const value = { posts, createPost, getPost, updatePost, deletePost };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}