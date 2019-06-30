import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpotifyIcon from "../assests/icons/spotify.svg";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import EmptyAlbumCover from "../assests/images/empty_album.png";

function Album(props) {
  const albumId = window.location.pathname.split("/album/")[1];

  const [albumData, setAlbumData] = useState();
  const [imgUrl, setImgUrl] = useState(EmptyAlbumCover);

  useEffect(() => {
    if (!albumData) {
      axios
        .get(`https://api.spotify.com/v1/albums/${albumId}`, {
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
        var img = new Image();
        img.src = albumData.images[0].url;
        img.onload = function() {
          setImgUrl(img.src);
        };
      }
      const artists = albumData.artists.map(artist => (
        <Link key={artist.id} to="/">
          {artist.name}
        </Link>
      ));

      const trackData = albumData.tracks.items.map(track => {
        var minutes = Math.floor(track.duration_ms / 60000);
        var seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
        const duration = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        return (
          <Col key={track.id} lg={12} className="results-track">
            <Row>
              <Col lg={12}>
                <Row>
                  <Col lg={10}>
                    <Link to={`/track/${track.id}`}>{track.name}</Link>
                  </Col>
                  <Col lg={2} className="text-right">
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

export default Album;
