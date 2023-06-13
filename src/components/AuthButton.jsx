import React, { useEffect, useState } from "react";

function AuthButton() {
  const [clientIdvar, setClientIdvar] = useState("")
  useEffect(() => {
    const fetchIt = async () => {
      let clientIdData = await fetch("http://localhost:5000/api/secrets/getclient")
      clientIdData = await clientIdData.json()
      setClientIdvar(clientIdData.clientId);
      console.log("client id here ",clientIdvar)
    }
    fetchIt();
  },[])
  function authorizeLink() {
    window.location =
      `http://accounts.spotify.com/en/authorize?client_id=${clientIdvar}&response_type=code&redirect_uri=http://localhost:5000/api/spotify/callback&scope=user-read-private%20user-read-email%20playlist-read-private%20streaming%20user-modify-playback-state%20app-remote-control%20user-read-playback-state%20user-top-read%20user-read-currently-playing%20playlist-modify-public%20playlist-modify-private%20user-library-read%20user-library-modify%20user-follow-read%20user-follow-modify%20user-read-playback-state%20user-read-recently-played&state=null&show_dialog=true`; ////"https://accounts.spotify.com/authorize?${args};
  }
  return <a onClick={authorizeLink}>Login with Spotify</a>;
}

export default AuthButton;
