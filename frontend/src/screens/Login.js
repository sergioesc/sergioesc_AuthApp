import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "../Reducers.js";

const reducer = (state, action) => {
  switch (action.payload) {
    case "POST_REQUEST":
      return { ...state, loading: true };
    case "POST_SUCCESS":
      return { ...state, loading: false };
    case "POST_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function Login() {
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Auth);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "POST_REQUEST" });
    try {
      setError("");
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      dispatch({ type: "POST_SUCCESS" });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      toast.error("Invalid username or password");
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(`/profile/${userInfo._id}`);
    }
  }, [navigate, userInfo]);

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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
