import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { UserContext } from '../../contexts/user-context';

import { signOutUser } from '../../config/firebase';

const Navigator = () => {

  const { currentUser } = useContext(UserContext);

  let navigate = useNavigate();

  const signOut = async () => {
    signOutUser().then((response) => {
      navigate("/");
    })
  }

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
              { currentUser ? (
                <>
                  <Nav.Link onClick={signOut}>Logout</Nav.Link>
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