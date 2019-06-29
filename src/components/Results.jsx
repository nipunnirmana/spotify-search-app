import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Results(props) {
  useEffect(() => {});

  const block = () => {
    return !props.results || !props.search.length ? (
      <Col lg={12}>FIND YOUR FAVORITE MUSIC</Col>
    ) : (
      props.results.artists.items.map(artist => (
        <div key={artist.id}>{artist.name}</div>
      ))
    );
  };

  return (
    <Row>
      <Col lg={12}>{block()}</Col>
    </Row>
  );
}

export default Results;
