import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { UserContext } from "../../contexts/user-context";

import { signOutUser } from "../../config/firebase-auth";

import "./navigator.css";

import app_logo from "../../assets/app_logo_500.jpg";

const Navigator = () => {
  const { currentUser } = useContext(UserContext);

  let navigate = useNavigate();

  const signOut = async () => {
    signOutUser().then((response) => {
      navigate("/");
    });
  };

  return (
    <>
      <Navbar sticky="top" expand="lg" variant="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/">
            <img src={app_logo} alt="Huffaker Hooligans" width="350px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto caveat-brush-regular">
              <Nav.Link as={Link} to={"/blog"}>
                <h2>Blog</h2>
              </Nav.Link>
              <Nav.Link as={Link} to={"/gallery"}>
                <h2>Gallery</h2>
              </Nav.Link>
              <Nav.Link as={Link} to={"/viewJourneys"}>
                <h2>Journeys</h2>
              </Nav.Link>
              {currentUser ? (
                <>
                  <Nav.Link onClick={signOut}>
                    <h2>Logout</h2>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <h2>Login</h2>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Navigator;
