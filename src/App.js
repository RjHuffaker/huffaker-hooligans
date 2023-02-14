import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

import { auth } from './config/firebase';

import Navigation from './components/navigation/navigation';

import Home from './pages/home/home';
import Login from './pages/login/login';
import CreatePost from './pages/create-post/create-post';
import EditPost from './pages/edit-post/edit-post';
import ReadPost from './pages/read-post/read-post';
import PlacesMap from './pages/places-map/places-map';

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
      <Routes>
        <Route path='/' element={<Navigation isAuth={isAuth} signOutUser={signOutUser} />}>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path="/read/:postId" element={<ReadPost />} />
          <Route path='/places-map' element={<PlacesMap />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
