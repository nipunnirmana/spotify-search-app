import React from "react";
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
      <Col xs={2} lg={1}>
        <img alt="Spotofy" src={SpotifyIcon} className="logo-search" />
      </Col>
      <Col xs={10} lg={11}>
        <input
          type="text"
          placeholder="SEARCH SPOTIFY..."
          className="search-spotify"
          onKeyUp={props.doSearch}
        />
      </Col>
      <Col lg={{ span: 11, offset: 1 }}>
        <Results results={props.results} search={props.search} />
      </Col>
    </Row>
  );
}

export default Search;
