import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpotifyIcon from "../assests/icons/spotify.svg";
import EmptyAlbumCover from "../assests/images/empty_album.png";

function Artist(props) {
  const artistId = window.location.pathname.split("/artist/")[1];
  const [artistData, setArtistData] = useState();
  const [imgUrl, setImgUrl] = useState(EmptyAlbumCover);
  const [topTracksData, setTopTracks] = useState();

  useEffect(() => {
    if (!artistData) {
      axios
        .get(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: { Authorization: `Bearer ${props.authCode}` }
        })
        .then(response => {
          setArtistData(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }

    if (!topTracksData) {
      const country = "us";
      setTopTracks("Loading");
      axios
        .get(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${country}`,
          {
            headers: { Authorization: `Bearer ${props.authCode}` }
          }
        )
        .then(response => {
          setTopTracks(response.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [artistData, artistId, props.authCode, topTracksData]);

  const block = () => {
    if (artistData) {
      if (artistData.images.length) {
        var img = new Image();
        img.src = artistData.images[0].url;
        img.onload = function() {
          setImgUrl(img.src);
        };
      }

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
              <div className="track-name">{artistData.name}</div>
            </Col>

            <Col lg={12} className="track-artists p-0" />
          </Col>
        </Row>
      );
    }
  };

  const topTracksBlock = () => {
    if (topTracksData && topTracksData !== "Loading") {
      return topTracksData.tracks.map(track => {
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

      <Col lg={{ span: 11, offset: 1 }} className="results-tracks-header">
        Artists Top TRACKS
      </Col>

      <Col lg={{ span: 11, offset: 1 }}>{topTracksBlock()}</Col>
    </Row>
  );
}

export default Artist;
