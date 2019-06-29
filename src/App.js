import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [authCode, setAuthCode] = useState(
    localStorage.getItem("authCode") || null
  );
  const [name, setName] = useState();
  useEffect(() => {
    const urlSearchData = window.location.hash;
    const hasRequestCode = urlSearchData.search("access_token=");
    if (hasRequestCode) {
      const requestCode = urlSearchData.split("access_token=")[1];
      setAuthCode(requestCode);
      localStorage.setItem("authCode", requestCode);
    }
  }, []);

  const handleClick = () => {
    const authUrl = "https://accounts.spotify.com/authorize";
    const cid = "9a5438691913462cabcbfbb68aafae95";
    const rtype = "token";
    const redirect = "http://localhost:3000/";
    window.location = `${authUrl}?client_id=${cid}&response_type=${rtype}&redirect_uri=${redirect}`;
  };

  const mainBlock = () => {
    let block = <button onClick={handleClick}>Please Login</button>;
    if (authCode) {
      block = <div> Welcome back {name} </div>;
      const userData = axios
        .get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${authCode}` }
        })
        .then(response => {
          setName(response.data.display_name);
        });
    }
    return block;
  };

  return <div className="App">{mainBlock()}</div>;
}

export default App;
