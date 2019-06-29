import React, { useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpotifyIcon from "../assests/icons/spotify.svg";
import Results from "./Results";
import Header from "./Header";

function Search(props) {
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
