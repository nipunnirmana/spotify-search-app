import React, { useEffect, useState, Fragment } from "react";
import "./bootstrap.min.css";
import "./App.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function App() {
  const [authCode, setAuthCode] = useState(
    localStorage.getItem("authCode") || null
  );
  const [name, setName] = useState();
  useEffect(() => {
    const urlSearchData = window.location.hash;
    const hasRequestCode = urlSearchData.search("access_token=");
    if (hasRequestCode >= 0) {
      const requestCode = urlSearchData.split("access_token=")[1];
      setAuthCode(requestCode);
      localStorage.setItem("authCode", requestCode);
    }
  }, []);

  const handleClick = () => {
    redirectToAuthPage();
  };

  const redirectToAuthPage = () => {
    const authUrl = "https://accounts.spotify.com/authorize";
    const cid = "9a5438691913462cabcbfbb68aafae95";
    const rtype = "token";
    const redirect = "http://localhost:3000/";
    window.location = `${authUrl}?client_id=${cid}&response_type=${rtype}&redirect_uri=${redirect}`;
  };

  const mainBlock = () => {
    let block = <Button onClick={handleClick}>Please Login</Button>;
    if (authCode) {
      block = <div> Welcome back {name} </div>;
      const userData = axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${authCode}` }
        })
        .then(response => {
          setName(response.data.display_name);
        })
        .catch(err => {
          localStorage.removeItem("authCode");
          redirectToAuthPage();
        });
    }
    return block;
  };

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col lg={12}>{mainBlock()}</Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
