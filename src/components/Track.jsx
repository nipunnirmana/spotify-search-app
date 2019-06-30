import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpotifyIcon from "../assests/icons/spotify.svg";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";

function Track(props) {
  const trackId = window.location.pathname.split("/track/")[1];

  const [trackData, setTrackData] = useState();

  useEffect(() => {
    console.count();
    if (!trackData) {
      axios
        .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: { Authorization: `Bearer ${props.authCode}` }
        })
        .then(response => {
          setTrackData(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  const block = () => {
    return trackData && <h1>{trackData.name}</h1>;
  };

  return (
    <Row>
      <Col lg={12} className="text-right">
        <Header
          name={props.name}
          setName={props.setName}
          authCode={props.authCode}
          redirectToAuthPage={props.redirectToAuthPage}
        />
      </Col>

      <Col xs={2} lg={1}>
        <img alt="Spotify" src={SpotifyIcon} className="logo-search" />
      </Col>

      <Col xs={10} lg={11}>
        <Link className="back-to-search" to="/">
          {"<"} BACK TO SEARCH
        </Link>
      </Col>

      <Col lg={12}>{block()}</Col>
    </Row>
  );
}

export default Track;
