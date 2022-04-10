import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {useNavigate, useParams } from "react-router-dom";
import NavbarProfile from "../components/Navbar.js";
import { Auth } from "../Reducers.js";
import {toast} from "react-toastify";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function ProfileScreenEdit() {
  const { state, dispatch: ctxDispatch } = useContext(Auth);
  const navigate = useNavigate("");
  const params = useParams();
  const { id: userId } = params;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState();
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setName(data.name);
        setEmail(data.email);
        setBio(data.bio);
        setFullName(data.fullName);
        setPhone(data.phone);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
        });
      }
    };
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`http://localhost:5000/api/users/${userId}`, {
        _id: userId,
        name,
        email,
        bio,
        fullName,
        phone,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("User updated!")
      setTimeout(() => {
        navigate(`/profile/${userId}`);
      },2000)
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  return (
    <div className="text-light">
      <NavbarProfile />
      <Container className="my-3 text-center">
        <h1>Personal info</h1>
        <p>Basic info like your name and photo</p>
      </Container>
      <Container className="profile-container bg-white text-dark p-3">
        <Row className="mx-0 border-bottom">
          <Col xs={12} md={10} className="p-0">
            <h2>Profile</h2>
            <p>Some info about the profile</p>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>PHOTO</Col>
            <Col xs={8}>una imagen</Col>
          </Row>
          <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>USERNAME</Col>
            <Col xs={8}>
              <Form.Control onChange={(e) => setName(e.target.value)} />
            </Col>
          </Row>
          <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>BIO</Col>
            <Col xs={8}>
              <Form.Control onChange={(e) => setBio(e.target.value)} />
            </Col>
          </Row>
          <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>FULL NAME</Col>
            <Col xs={8}>
              <Form.Control onChange={(e) => setFullName(e.target.value)} />
            </Col>
          </Row>
          <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>PHONE</Col>
            <Col>
              <Form.Control onChange={(e) => setPhone(e.target.value)} />
            </Col>
          </Row>
          <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>EMAIL</Col>
            <Col>
              <Form.Control onChange={(e) => setEmail(e.target.value)} />
            </Col>
          </Row>
          <Row className="w-25 text-center mx-auto d-flex mt-3">
            <Button type="submit">Update User</Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
