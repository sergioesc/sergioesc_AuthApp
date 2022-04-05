import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default function NavbarProfile() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-container" variant="dark">
        <Container>
            <Navbar.Brand to="/profile"> sergioesc </Navbar.Brand>
            <Nav className="ms-auto">
                <NavDropdown title="sergio ">
                    <NavDropdown.Item>
                        My profile
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        Log Out
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
    </Navbar>
    )
}
