import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Results(props) {
  useEffect(() => {});

  const block = () => {
    let block = [];
    if (props.results && props.search.length) {
      if (props.results.artists) {
        block = [
          ...block,
          <Col key={0} lg={12} className="results-artist-header">
            TOP ARTISTS
          </Col>
        ];
      }
      props.results.artists.items.forEach(artist => {
        console.log(artist);
        const imgUrl = artist.images.length ? artist.images[0].url : "";
        block = [
          ...block,
          <Col lg={2} key={artist.id} className="results-artist">
            <Row>
              <Col lg={12}>
                <div
                  className="results-artist-cover"
                  style={{ backgroundImage: `url(${imgUrl})` }}
                />
              </Col>

              <Col lg={12}>
                <span className="results-artist-name">{artist.name}</span>
              </Col>
            </Row>
          </Col>
        ];
      });
    } else {
      block = (
        <Col key={1} lg={12} className="results-empty text-center">
          FIND YOUR FAVORITE MUSIC
        </Col>
      );
    }

    return block;
  };

  return <Row>{block()}</Row>;
}

export default Results;
