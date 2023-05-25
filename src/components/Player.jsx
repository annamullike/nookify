import React from "react";
import "../assets/styles.scss";
function Player() {
  const rewind = () => {
    fetch("http://localhost:5000/api/spotify/previous", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const ffwd = () => {
    fetch("http://localhost:5000/api/spotify/next", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const pause = () => {
    fetch("http://localhost:5000/api/spotify/pause", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const play = () => {
    fetch("http://localhost:5000/api/spotify/playcurrent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div className="player">
      <div className="player-container">
        <button onClick={rewind}>rwnd</button>
        <button onClick={pause}>pause</button>
        <button onClick={play}>play</button>
        <button onClick={ffwd}>ffwd</button>
      </div>
    </div>
  );
}

export default Player;
