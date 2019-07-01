import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpotifyIcon from "../assests/icons/spotify.svg";

function Oops() {
  return (
    <Row className="text-center vh-100 oops">
      <Col className="m-auto">
        <Col lg={12} className="p-10">
          <img alt="Spotofy" src={SpotifyIcon} className="logo" />
        </Col>
        <Col lg={12}>
          <span className="oops-text">
            404 : Requested Page Does not exits{" "}
          </span>
        </Col>
        <Col lg={12}>
          <Link to={"/"} className="oops-wrapper">
            <Button>Go Back to Home</Button>
          </Link>
        </Col>
      </Col>
    </Row>
  );
}

export default Oops;
