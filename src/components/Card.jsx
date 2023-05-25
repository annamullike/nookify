import React from "react";
import "../assets/styles.scss";
import froggy from "../assets/froggy2.png"
function Card(props) {
  const { title, src, id } = props;
  const play = () => {
    fetch("http://localhost:5000/api/spotify/playtrack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trackUri: id
      })
    })
  }
  const pause = () => {
    fetch("http://localhost:5000/api/spotify/pause", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
  }
  return (
    <div className="card" style={{ backgroundImage: `url(${froggy})`, backgroundPosition: 'center ', backgroundSize: '110%', backgroundRepeat: 'no-repeat',height: '490px' }}>
      <div className="cardContainer">
        <h3>{title}</h3>
        <img src={src} />
        <button onClick={play} id={id}>play</button>
        <button onClick={pause} id={id}>pause</button>
      </div>
    </div>
  );
}


export default Card;
