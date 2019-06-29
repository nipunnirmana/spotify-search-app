import React, { useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpotifyIcon from "../assests/icons/spotify.svg";
import Results from "./Results";

function Search(props) {
  useEffect(() => {
    const userData = axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${props.authCode}` }
      })
      .then(response => {
        props.setName(response.data.display_name);
      })
      .catch(err => {
        localStorage.removeItem("authCode");
        props.redirectToAuthPage();
      });
  });

  return (
    <Row>
      <Col lg={12} className="text-right">
        <div className="search-user">{props.name}</div>
      </Col>
      <Col lg={1}>
        <img alt="Spotofy" src={SpotifyIcon} className="logo-search" />
      </Col>
      <Col lg={11}>
        <input
          type="text"
          placeholder="SEARCH SPOTIFY..."
          className="search-spotify"
          onChange={props.doSearch}
        />
      </Col>
      <Col lg={12}>
        <Results results={props.results} search={props.search} />
      </Col>
    </Row>
  );
}

export default Search;
