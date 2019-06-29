import React, { useEffect } from "react";
import axios from "axios";

function Search(props) {
  useEffect(() => {
    const userData = axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${props.authCode}` }
      })
      .then(response => {
        props.setName(response.data.display_name);
      })
      .catch(err => {
        localStorage.removeItem("authCode");
        props.redirectToAuthPage();
      });
  });
  return <div> Welcome back {props.name}</div>;
}

export default Search;
