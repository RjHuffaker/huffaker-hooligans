import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostsProvider } from './contexts/posts-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostsProvider>
      <App />
    </PostsProvider>
  </React.StrictMode>
);
