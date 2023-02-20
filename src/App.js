import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigator />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path="/read/:postId" element={<ReadPost />} />
          <Route path='/places-map' element={<PlacesMap />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
