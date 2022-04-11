import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarProfile from "../components/Navbar.js";
import { Auth } from "../Reducers.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function ProfileScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Auth);
  const { userInfo } = state;
  const params = useParams();
  const { id: userId } = params;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState();
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
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
        setImage(data.image);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
        });
      }
    };
    fetchData();
    if (!userInfo) {
      navigate("/");
    }
  }, [userId, userInfo]);

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
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
          <Col xs={12} md={2} className="">
            <Button className="px-4 my-3 mx-auto">
              <Link
                className="link-style text-light"
                to={`/profile/edit/${userInfo._id}`}
              >
                Edit
              </Link>
            </Button>
          </Col>
        </Row>
        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          <Form>
            <Row className="mx-0 text-start py-3 border-bottom d-flex align-items-center">
              <Col xs={5} md={4}>
                PHOTO
              </Col>
              <Col
                xs={7}
                md={8}
                className="d-flex justify-content-center mx-auto"
              >
                {!image ? (
                  <img
                    src="https://res.cloudinary.com/dvxgriyni/image/upload/v1649697641/iongrudxhn1fjfacvsu2.jpg"
                    alt="profile"
                    className="profile-image"
                  />
                ) : (
                  <img src={image} alt={name} className="profile-image" />
                )}
              </Col>
            </Row>
            <Row className="mx-0 text-start py-3 border-bottom">
              <Col xs={5} md={4}>
                USERNAME
              </Col>
              <Col xs={7} md={8}>
                <Form.Control value={name} readOnly />
              </Col>
            </Row>
            <Row className="mx-0 text-start py-3 border-bottom">
              <Col xs={5} md={4}>
                BIO
              </Col>
              <Col xs={7} md={8}>
                <Form.Control value={bio} readOnly />
              </Col>
            </Row>
            <Row className="mx-0 text-start py-3 border-bottom">
              <Col xs={5} md={4}>
                FULL NAME
              </Col>
              <Col xs={7} md={8}>
                <Form.Control value={fullName} readOnly />
              </Col>
            </Row>
            <Row className="mx-0 text-start py-3 border-bottom">
              <Col xs={5} md={4}>
                PHONE
              </Col>
              <Col xs={7} md={8}>
                <Form.Control value={phone} readOnly />
              </Col>
            </Row>
            <Row className="mx-0 text-start py-3 border-bottom">
              <Col xs={5} md={4}>
                EMAIL
              </Col>
              <Col xs={7} md={8}>
                <Form.Control value={email} readOnly />
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </div>
  );
}
