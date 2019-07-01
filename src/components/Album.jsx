import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpotifyIcon from "../assests/icons/spotify.svg";
import EmptyAlbumCover from "../assests/images/empty_album.png";

function Album(props) {
  const [albumData, setAlbumData] = useState();
  const [imgUrl, setImgUrl] = useState(EmptyAlbumCover);

  useEffect(() => {
    /**
     * Fetch Album Data
     */
    if (!albumData) {
      axios
        .get(`https://api.spotify.com/v1/albums/${props.albumId}`, {
          headers: { Authorization: `Bearer ${props.authCode}` }
        })
        .then(response => {
          setAlbumData(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  const block = () => {
    if (albumData) {
      if (albumData.images.length) {
        /**
         * Lazy Load Album Image
         */
        var img = new Image();
        img.src = albumData.images[0].url;
        img.onload = function() {
          setImgUrl(img.src);
        };
      }

      /**
       * Get album artists list
       */
      const artists = albumData.artists.map(artist => (
        <Link key={artist.id} to={`/artist/${artist.id}`}>
          {artist.name}
        </Link>
      ));

      /**
       * Track list related data
       */

      const trackData = albumData.tracks.items.map(track => {
        var minutes = Math.floor(track.duration_ms / 60000);
        var seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
        const duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        return (
          <Col key={track.id} lg={12} className="results-track">
            <Row>
              <Col lg={12}>
                <Row>
                  <Col lg={10} md={9}>
                    <Link to={`/track/${track.id}`}>{track.name}</Link>
                  </Col>
                  <Col lg={2} md={3} className="text-right">
                    <span>{duration}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        );
      });

      return (
        <Row className="track">
          <Col lg={3}>
            <span
              className="track-album"
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          </Col>
          <Col lg={9}>
            <Col lg={12} className="p-0">
              <div className="track-name">{albumData.name}</div>
            </Col>
            <Col lg={12} className="track-artists p-0">
              {artists}
            </Col>
          </Col>

          <Col lg={12} className="results-tracks-header">
            TRACK LIST
          </Col>

          <Col lg={12}>
            <Row>{trackData}</Row>
          </Col>
        </Row>
      );
    }
  };

  return (
    <Row>
      <Col lg={12} className="text-right">
        <Header
          history={props.history}
          name={props.name}
          setName={props.setName}
          authCode={props.authCode}
          redirectToAuthPage={props.redirectToAuthPage}
        />
      </Col>

      <Col xs={2} lg={1}>
        <img alt="Spotify" src={SpotifyIcon} className="logo-search" />
      </Col>

      <Col xs={10} lg={11}>
        <Link className="back-to-search" to="/">
          {"<"} BACK TO SEARCH
        </Link>
      </Col>

      <Col lg={{ span: 11, offset: 1 }}>{block()}</Col>
    </Row>
  );
}

Album.propTypes = {
  redirectToAuthPage: PropTypes.func,
  authCode: PropTypes.string,
  name: PropTypes.string,
  setName: PropTypes.func,
  albumId: PropTypes.string,
  history: PropTypes.object
};

export default Album;
