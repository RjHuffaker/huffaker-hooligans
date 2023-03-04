import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './fonts/wooden-log.regular.ttf'; 

import { UserProvider } from './contexts/user-context';
import { PostsProvider } from './contexts/posts-context';
import { JourneysProvider } from './contexts/journeys-context';

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <PostsProvider>
        <JourneysProvider>
          <App />
        </JourneysProvider>
      </PostsProvider>
    </UserProvider>
  </React.StrictMode>
);
