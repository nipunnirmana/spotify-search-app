import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpotifyIcon from "../assests/icons/spotify.svg";
import EmptyAlbumCover from "../assests/images/empty_album.png";

function Track(props) {
  const trackId = window.location.pathname.split("/track/")[1];

  const [trackData, setTrackData] = useState();
  const [imgUrl, setImgUrl] = useState(EmptyAlbumCover);

  useEffect(() => {
    
    /**
     * Get Track Data
     */

    if (!trackData) {
      axios
        .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: { Authorization: `Bearer ${props.authCode}` }
        })
        .then(response => {
          setTrackData(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  const block = () => {
    if (trackData) {
      if (trackData.album.images.length) {
        var img = new Image();
        img.src = trackData.album.images[0].url;
        img.onload = function() {
          setImgUrl(img.src);
        };
      }

      var minutes = Math.floor(trackData.duration_ms / 60000);
      var seconds = ((trackData.duration_ms % 60000) / 1000).toFixed(0);
      const duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

      const artists = trackData.artists.map(artist => (
        <Link key={artist.id} to={`/artist/${artist.id}`}>
          {artist.name}
        </Link>
      ));
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
              <div className="track-name">{trackData.name}</div>
            </Col>
            <Col lg={12} className="track-duration p-0">
              {duration}
            </Col>
            <Col lg={12} className="track-artists p-0">
              {artists}
            </Col>
          </Col>
        </Row>
      );
    }
  };

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

export default Track;