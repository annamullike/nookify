import React from "react";
import "../assets/styles.scss";
import froggy from "../assets/froggy2.png"
function Card(props) {
  const { title, src, id } = props;
  const button = () => {
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
  return (
    <div className="card" style={{ backgroundImage: `url(${froggy})`, backgroundPosition: 'center ', backgroundSize: '110%', backgroundRepeat: 'no-repeat',height: '490px' }}>
      <div className="cardContainer">
        <h3>{title}</h3>
        <img src={src} />
        <button onClick={button} id={id}>CLICK ME</button>
      </div>
    </div>
  );
}


export default Card;
