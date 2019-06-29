import React, { useEffect, useState, Fragment } from "react";
import "./bootstrap.min.css";
import "./App.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./components/Login";
import Search from "./components/Search";

function App() {
  const [authCode, setAuthCode] = useState(
    localStorage.getItem("authCode") || null
  );
  const [name, setName] = useState();
  const [search, setSearch] = useState();
  const [results, setResults] = useState();
  useEffect(() => {
    const urlSearchData = window.location.hash;
    const hasRequestCode = urlSearchData.search("access_token=");
    if (hasRequestCode >= 0) {
      const requestCode = urlSearchData.split("access_token=")[1];
      setAuthCode(requestCode);
      localStorage.setItem("authCode", requestCode);
    }
  }, []);

  const redirectToAuthPage = () => {
    const authUrl = "https://accounts.spotify.com/authorize";
    const cid = "9a5438691913462cabcbfbb68aafae95";
    const rtype = "token";
    const redirect = "http://localhost:3000/";
    window.location = `${authUrl}?client_id=${cid}&response_type=${rtype}&redirect_uri=${redirect}`;
  };

  const doSearch = event => {
    const q = event.target.value.trim();
    const type = "track,artist";
    setSearch(q);

    if (q) {
      axios
        .get(`https://api.spotify.com/v1/search?q=${q}&type=${type}`, {
          headers: { Authorization: `Bearer ${authCode}` }
        })
        .then(response => {
          setResults(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      setResults();
    }
  };

  const container = () => {
    return authCode ? (
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
    ) : (
      <Login redirectToAuthPage={redirectToAuthPage} />
    );
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

export default App;
