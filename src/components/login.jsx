import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpotifyIcon from "../assests/icons/spotify.svg";

function Login(props) {
  return (
    <Row className="text-center vh-100">
      <Col className="m-auto">
        <Col lg={12}>
          <img alt="Spotofy" src={SpotifyIcon} className="logo" />
        </Col>
        <Col lg={12}>
          <span className="login-text">PLEASE LOGIN TO CONTINUE</span>
        </Col>
        <Col lg={12}>
          <Button onClick={props.redirectToAuthPage}>Login</Button>;
        </Col>
      </Col>
    </Row>
  );
}

export default Login;
