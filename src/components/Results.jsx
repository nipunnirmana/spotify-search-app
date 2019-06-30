import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EmptyAlbumCover from "../assests/images/empty_album.png";

function Results(props) {
  const block = () => {
    let block = [];
    if (props.results && props.search.length) {
      if (props.results.tracks.total) {
        block = [
          ...block,
          <Col key={0} lg={12} className="results-tracks-header">
            TOP TRACKS
          </Col>
        ];

        props.results.tracks.items.forEach(track => {
          const artists = track.artists.map(artist => (
            <Link key={artist.id} to={`/artist/${artist.id}`}>
              {artist.name}
            </Link>
          ));

          var minutes = Math.floor(track.duration_ms / 60000);
          var seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
          const duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

          let imgUrl = track.album.images.length
            ? track.album.images[0].url
            : EmptyAlbumCover;
          block = [
            ...block,

            <Col key={track.id} lg={12} className="results-track">
              <Row>
                <Col lg={2}>
                  <Link to={`/album/${track.album.id}`}>
                    <span
                      className="results-track-cover"
                      style={{ backgroundImage: `url(${imgUrl})` }}
                    />
                  </Link>
                </Col>
                <Col lg={10}>
                  <Row>
                    <Col lg={10} md={12}>
                      <Link to={`/track/${track.id}`}>{track.name}</Link>
                    </Col>
                    <Col lg={2} md={12} className="text-right results-duration">
                      <span>{duration}</span>
                    </Col>
                    <Col lg={12} className="track-artists">
                      <span>Artist : </span>
                      {artists}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          ];
        });
      }

      if (props.results.artists.total) {
        block = [
          ...block,
          <Col key={1} lg={12} className="results-artists-header">
            TOP ARTISTS
          </Col>
        ];

        props.results.artists.items.forEach(artist => {
          let imgUrl = artist.images.length
            ? artist.images[0].url
            : EmptyAlbumCover;
          block = [
            ...block,
            <Col lg={2} key={artist.id} className="results-artist">
              <Link to={`/artist/${artist.id}`}>
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
              </Link>
            </Col>
          ];
        });
      }

      if (!props.results.tracks.total && !props.results.artists.total) {
        block = (
          <Col key={3} lg={12} className="results-empty text-center">
            NO RESULTS AVAILABLE...
          </Col>
        );
      }
    } else {
      block = (
        <Col key={2} lg={12} className="results-empty text-center">
          FIND YOUR FAVORITE MUSIC
        </Col>
      );
    }

    return block;
  };

  return <Row>{block()}</Row>;
}

export default Results;
