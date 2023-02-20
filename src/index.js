import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { UserProvider } from './contexts/user-context';
import { PostsProvider } from './contexts/posts-context';
import { PlacesProvider } from './contexts/places-context';

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PostsProvider>
        <PlacesProvider>
          <App />
        </PlacesProvider>
      </PostsProvider>
    </UserProvider>
  </React.StrictMode>
);
