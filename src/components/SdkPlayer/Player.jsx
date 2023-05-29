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
        <a onClick={rewind}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rewind" viewBox="0 0 16 16">
  <path d="M9.196 8 15 4.633v6.734L9.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z"/>
  <path d="M1.196 8 7 4.633v6.734L1.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z"/>
</svg></a>
        <a onClick={pause}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause" viewBox="0 0 16 16">
  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
</svg></a>
        <a onClick={play}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg></a>
        
        <a onClick={ffwd}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward" viewBox="0 0 16 16">
  <path d="M6.804 8 1 4.633v6.734L6.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
  <path d="M14.804 8 9 4.633v6.734L14.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
</svg></a>
      </div>
    </div>
  );
}

export default Player;
