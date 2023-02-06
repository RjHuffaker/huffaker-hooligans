import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

import { auth } from './utils/firebase/firebase.utils';

import Home from './pages/Home.page';
import Login from './pages/Login.page';
import CreatePost from './pages/CreatePost.page';

import './App.css';

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
      <nav>
        <Link to="/"> Home </Link>
        { isAuth ? (
          <>
            <Link to="/createpost"> Create Post </Link>
            <button onClick={signOutUser}>Logout</button>
          </>
        ) : (
          <Link to="/login"> Login </Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} ></Route>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} ></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
