import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostsProvider } from './contexts/posts-context';
import { PlacesProvider } from './contexts/places-context';

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostsProvider>
      <PlacesProvider>
        <App />
      </PlacesProvider>
    </PostsProvider>
  </React.StrictMode>
);
