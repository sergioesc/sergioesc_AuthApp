import React, { useContext, useState , useEffect} from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../Reducers.js";
import axios from "axios";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.payload) {
    case "POST_REQUEST":
      return { ...state, loading: true };
    case "POST_SUCCESS":
      return { ...state, loading: false };
    case "POST_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Login() {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Auth);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "POST_REQUEST" });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      dispatch({ type: "POST_SUCCESS" });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({ type: "POST_FAIL", payload: error });
    }
  };
  useEffect(() => {
    if(userInfo){
      navigate(`/profile/${userInfo._id}`)
    }
  }, [navigate, userInfo])

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
              required
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="button" className="mx-auto d-flex">
            <Button type="submit" className="w-75 mx-auto">
              Register
            </Button>
          </Form.Group>
        </Form>
        <Container>
        </Container>
        <Container>
          <p className="text-muted my-4 text-center">
            or continue the register with these social profile
          </p>
        </Container>
      </Container>
    </Container>
  );
}
