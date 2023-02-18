import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

import { auth } from './config/firebase';

import Navigator from './components/navigator/navigator';

import Home from './pages/home/home';
import Blog from './pages/blog/blog';
import Login from './pages/login/login';
import CreatePost from './pages/create-post/create-post';
import EditPost from './pages/edit-post/edit-post';
import ReadPost from './pages/read-post/read-post';
import PlacesMap from './pages/places-map/places-map';

import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Route path='/' element={<Navigator isAuth={isAuth} signOutUser={signOutUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog isAuth={isAuth} />} />
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
