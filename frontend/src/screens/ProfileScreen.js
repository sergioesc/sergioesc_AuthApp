import { Button, Col, Container, Row } from "react-bootstrap";
import NavbarProfile from "../components/Navbar.js";

export default function ProfileScreen() {
  return (
    <div className="text-light">
      <NavbarProfile />
      <Container className="my-5 text-center">
        <h1>Personal info</h1>
        <p>Basic info like your name and photo</p>
      </Container>
      <Container className="profile-container bg-white text-dark p-3">
        <Row className="mx-0 border-bottom">
          <Col xs={12} md={10} className="p-0">
            <h2>Profile</h2>
            <p>Some info about the profile</p>
          </Col>
          <Col xs={12} md={2} className="" >
            <Button className="px-4 my-3 mx-auto"> Edit </Button>
          </Col>
        </Row>
        <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>
            PHOTO
            </Col>
            <Col xs={8}>
            una imagen
            </Col>
        </Row>
        <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>
            NAME
            </Col>
            <Col xs={8}>
            Un nombre
            </Col>
        </Row>
        <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>
            BIO
            </Col>
            <Col xs={8}>
            una imagen
            </Col>
        </Row>
        <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>
            PHONE
            </Col>
            <Col xs={8}>
            una imagen
            </Col>
        </Row>
        <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>
            EMAIL
            </Col>
            <Col xs={8}>
            una imagen
            </Col>
        </Row>
        <Row className="mx-0 text-start py-3 border-bottom">
            <Col xs={4}>
            PASSWORD
            </Col>
            <Col xs={8}>
            una imagen
            </Col>
        </Row>
      </Container>
    </div>
  );
}
