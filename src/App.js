import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Login from "./components/Login";
import Search from "./components/Search";
import Track from "./components/Track";
import Album from "./components/Album";
import Artist from "./components/Artist";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./bootstrap.min.css";
import "./App.css";

function App(props) {
  /**
   * Fetch Auth Code from Localstorage
   */
  const [authCode, setAuthCode] = useState(
    localStorage.getItem("authCode") || null
  );
  const [name, setName] = useState();
  const [search, setSearch] = useState();
  const [results, setResults] = useState();

  /**
   * Creating Cancelation token for Axions (to cancel unwated requests)
   */
  const signal = axios.CancelToken.source();

  useEffect(() => {
    /**
     * Getting Access Token from URL Hash
     */
    const urlSearchData = window.location.hash;
    const hasRequestCode = urlSearchData.search("access_token=");
    if (hasRequestCode >= 0) {
      const requestCode = urlSearchData.split("access_token=")[1];
      setAuthCode(requestCode);
      localStorage.setItem("authCode", requestCode);
    }
  }, []);

  /**
   * Redirect to Auth page for Spotify Authenticatio/Login
   */
  const redirectToAuthPage = () => {
    const authUrl = "https://accounts.spotify.com/authorize";
    const cid = "9a5438691913462cabcbfbb68aafae95";
    const rtype = "token";
    const redirect = "http://localhost:3000/";
    window.location = `${authUrl}?client_id=${cid}&response_type=${rtype}&redirect_uri=${redirect}`;
  };

  /**
   * Search Spotify based on input query
   */

  const doSearch = event => {
    const q = event.target.value.trim().replace(/[^\w\s]/gi, "");
    const type = "track,artist";
    const m = "us";
    const limit = 16;
    setSearch(q);

    if (q) {
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${q}&type=${type}&market=${m}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${authCode}` },
            cancelToken: signal.token // Passing Cancel token for Axios
          }
        )
        .then(response => {
          setResults(response.data);
        })
        .catch(err => {
          console.error(err);
          if (axios.isCancel(err)) {
            console.log("Error: ", err.message);
          }
        });
    } else {
      setResults();
    }
  };

  const container = () => {
    let block;

    if (authCode) {
      if (props.match.path === "/track/:id") {
        block = (
          <Track
            trackId={props.match.params.id}
            authCode={authCode}
            name={name}
            setName={setName}
            redirectToAuthPage={redirectToAuthPage}
          />
        );
      } else if (props.match.path === "/album/:id") {
        block = (
          <Album
            albumId={props.match.params.id}
            authCode={authCode}
            name={name}
            setName={setName}
            redirectToAuthPage={redirectToAuthPage}
          />
        );
      } else if (props.match.path === "/artist/:id") {
        block = (
          <Artist
            artistId={props.match.params.id}
            authCode={authCode}
            name={name}
            setName={setName}
            redirectToAuthPage={redirectToAuthPage}
          />
        );
      } else {
        block = (
          <Search
            authCode={authCode}
            name={name}
            setName={setName}
            redirectToAuthPage={redirectToAuthPage}
            search={search}
            doSearch={doSearch}
            results={results}
            setResults={setResults}
          />
        );
      }
    } else {
      block = <Login redirectToAuthPage={redirectToAuthPage} />;
    }

    return block;
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col lg={12}>{container()}</Col>
        </Row>
      </Container>
    </Fragment>
  );
}

App.propTypes = {
  match: PropTypes.object
};

export default App;
