import React from "react";
// import "../assets/styles.scss";
// import froggy from "../assets/froggy2.png";
import froggy from "../../assets/froggy2.png";
import styles from "./Card.module.scss";
function Card(props) {
  const { title, src, id, artist } = props;
  const like = () => {
    fetch("http://localhost:5000/api/spotify/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track: id,
      }),
    });
  };

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
  // const pause = () => {
  //   fetch("http://localhost:5000/api/spotify/pause", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${froggy})`,
        backgroundPosition: "center ",
        backgroundSize: "110%",
        backgroundRepeat: "no-repeat",
        height: "490px",
      }}
    >
      <div className={styles.cardContainer}>
        <div className={styles.titlesContent}>
          <div>
            <h3 id={styles.h3}>{title}</h3>
            <h4 id={styles.h4}>{artist}</h4>
          </div>
          <div className={styles.svgs}><a onClick={play}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-play-fill"
              viewBox="0 0 16 16"
              style={{ width: "43px", height: "43px" }}
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          </a>
          <a onClick={like}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
              style={{ width: "28px", height: "28px" }}
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </a></div>
        </div>

        <img src={src} />
        <div>
          
          
        </div>
      </div>
    </div>
  );
}

export default Card;
