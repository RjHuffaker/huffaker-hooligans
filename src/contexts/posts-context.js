import { createContext, useState, useEffect } from 'react';

import {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  readDocument
} from '../config/firebase';

import { auth } from '../config/firebase';

export const PostsContext = createContext({
  posts: []
});

export const PostsProvider = ({children}) => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const postsList = await getAllDocuments('posts');
    setPosts(postsList);
  };

  const getPost = async (postId) => {
    return await readDocument("posts", postId);
  }

  const createPost = async (post) => {
    const newPost = await createDocument("posts", {
      ...post, author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid
      }
    });
    setPosts([...posts, newPost]);
  }

  const updatePost = async (post) => {
    const postToUpdate = await updateDocument('post', {
      ...post, author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid
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