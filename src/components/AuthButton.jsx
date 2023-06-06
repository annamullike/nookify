import React from "react";

function AuthButton() {
  const redirectUri = "http://localhost:5000/api/spotify/callback";
  const clientId = "dbd6bdd2c40c42c696176d6bd1d108d5";
  function authorizeLink() {
    window.location =
      "http://accounts.spotify.com/en/authorize?client_id=dbd6bdd2c40c42c696176d6bd1d108d5&response_type=code&redirect_uri=http://localhost:5000/api/spotify/callback&scope=user-read-private%20user-read-email%20playlist-read-private%20streaming%20user-modify-playback-state%20app-remote-control%20user-read-playback-state%20user-top-read%20user-read-currently-playing%20playlist-modify-public%20playlist-modify-private%20user-library-read%20user-library-modify%20user-follow-read%20user-follow-modify%20user-read-playback-state%20user-read-recently-played&state=null&show_dialog=true"; ////"https://accounts.spotify.com/authorize?"+args;
  }
  return <a onClick={authorizeLink}>Authorize Me</a>;
}

export default AuthButton;
