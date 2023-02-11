import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

import { auth } from './config/firebase';

import NavHeader from './components/nav-header/nav-header';
import Home from './pages/home/home';
import Login from './pages/login/login';
import CreatePost from './pages/create-post/create-post';

import './App.css';
import EditPost from './pages/edit-post/edit-post';

function App() {

  const [ isAuth, setIsAuth ] = useState(localStorage.getItem('isAuth'));

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    })
  }

  return (
    <Router>
      <NavHeader isAuth={isAuth} signOutUser={signOutUser}></NavHeader>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/edit/:postId" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
