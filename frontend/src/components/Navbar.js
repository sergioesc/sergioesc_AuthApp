import React from "react";
import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Auth } from "../Reducers.js";

export default function NavbarProfile() {
  const { state, dispatch: ctxDispatch } = useContext(Auth);
  const { userInfo } = state;

  


  const handleSignOut = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };
  return (
    <div> {
      !userInfo ? (
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar-container"
        variant="dark"
      >
        <Container>
          <Navbar.Brand to="/profile"> sergioesc </Navbar.Brand>
          <Link className="ms-auto link-style text-light" to="/">
            Login
          </Link>
        </Container>
      </Navbar>
      ) : (
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar-container"
        variant="dark"
      >
        <Container>
          <Navbar.Brand to="/profile"> sergioesc </Navbar.Brand>
          <Nav className="ms-auto">
            <NavDropdown title={userInfo.name}>
              <NavDropdown.Item>My profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignOut}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      )
    }</div>
  );
}
