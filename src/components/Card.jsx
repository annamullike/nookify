import React from "react";
import "../assets/styles.scss";
import froggy from "../assets/froggy2.png";
function Card(props) {
  const { title, src, id } = props;
  const play = () => {
    fetch("http://localhost:5000/api/spotify/playtrack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trackUri: id,
      }),
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
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${froggy})`,
        backgroundPosition: "center ",
        backgroundSize: "110%",
        backgroundRepeat: "no-repeat",
        height: "490px",
      }}
    >
      <div className="cardContainer">
        <h3>{title}</h3>
        <img src={src} />
        <div><a onClick={play}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-play-fill"
            viewBox="0 0 16 16"
          >
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        </a></div>
        
      </div>
    </div>
  );
}

export default Card;
