import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function Header(props) {
  useEffect(() => {
    /**
     * Make sure Authentication code works redirects to auth page if its not
     */

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${props.authCode}` }
      })
      .then(response => {
        props.setName(response.data.display_name);
      })
      .catch(err => {
        /**
         * Redirect to Spotify Authentication if token is expired or invalidated
         */
        localStorage.removeItem("authCode");
        props.redirectToAuthPage();
      });
  });

  return <div className="header-user">{props.name}</div>;
}

Header.propTypes = {
  redirectToAuthPage: PropTypes.func,
  authCode: PropTypes.string,
  name: PropTypes.string,
  setName: PropTypes.func
};

export default Header;
