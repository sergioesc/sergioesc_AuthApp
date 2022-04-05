import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <Container className="login-container bg-white p-3">
      <Container>
        <small>sergioesc</small>
        <p className="mt-2">
          <b>sergioesc Web developer. Authentication App</b>
        </p>
        <p>Master web developer by making real-life projects</p>
      </Container>
      <Container>
        <Form>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" />
            <p className="text-end text-muted my-3">
              Don't have an account yet?. <Link to="/register">Register</Link>
            </p>
          </Form.Group>
          <Form.Group controlId="button" className="mx-auto d-flex">
            <Button type="submit" className="w-75 mx-auto">
              LogIn
            </Button>
          </Form.Group>
        </Form>

        <Container>
          <p className="text-muted my-4 text-center">
            or continue with these social profile
          </p>
        </Container>
      </Container>
    </Container>
  );
}
