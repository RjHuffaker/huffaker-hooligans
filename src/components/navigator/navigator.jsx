import { Link, Outlet } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigator = ({isAuth, signOutUser}) => {
  return (
    <>
      <Navbar sticky="top" bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Huffaker Hooligans</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
              <Nav.Link as={Link} to={"/blog"}>Blog</Nav.Link>
              <Nav.Link as={Link} to={"/places-map"}>Places</Nav.Link>
              { isAuth ? (
                <>
                <Nav.Link as={Link} to={"/createPost"}>Create Post</Nav.Link>
                <Nav.Link onClick={signOutUser}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navigator;