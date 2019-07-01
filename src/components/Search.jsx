import React from "react";
import PropTypes from "prop-types";
import Results from "./Results";
import Header from "./Header";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpotifyIcon from "../assests/icons/spotify.svg";

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
      <Col xs={12} sm={2} lg={1} className="logo-search-wrapper">
        <img alt="Spotify" src={SpotifyIcon} className="logo-search" />
      </Col>
      <Col xs={12} sm={10} lg={11}>
        <input
          autoFocus
          type="text"
          placeholder="SEARCH SPOTIFY..."
          className="search-spotify"
          onChange={props.doSearch}
          defaultValue={props.search}
        />
      </Col>
      <Col lg={{ span: 11, offset: 1 }}>
        <Results results={props.results} search={props.search} />
      </Col>
    </Row>
  );
}

Search.propTypes = {
  redirectToAuthPage: PropTypes.func,
  authCode: PropTypes.string,
  name: PropTypes.string,
  setName: PropTypes.func,
  doSearch: PropTypes.func,
  results: PropTypes.object,
  search: PropTypes.string
};

export default Search;
