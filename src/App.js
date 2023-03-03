import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserContext } from './contexts/user-context';

import Navigator from './components/navigator/navigator';
import Home from './pages/home/home';
import Blog from './pages/blog/blog';
import Login from './pages/login/login';
import CreatePost from './pages/create-post/create-post';
import EditPost from './pages/edit-post/edit-post';
import ReadPost from './pages/read-post/read-post';

import ViewJourneys from './pages/view-journeys/view-journeys';
import EditJourney from './pages/edit-journey/edit-journey';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

  const { currentUser } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigator />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/createpost" element={currentUser ? <CreatePost /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editPost/:postId" element={currentUser ? <EditPost /> : <Login />} />
          <Route path="/readPost/:postId" element={<ReadPost />} />
          <Route path='/viewJourneys' element={<ViewJourneys />} />
          <Route path='/editJourney/:journeyId' element={<EditJourney />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
