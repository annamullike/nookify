import React, { useState } from "react";
import styles from "./Recommendations.module.scss";
function RecommendationsButton(props) {
  const [recs, setRecs] = useState([]);
  const recsButton = () => {
    fetch("http://localhost:5000/api/spotify/recommendations")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.setRecNames(data.names)
        props.setRecIds(data.ids)
        // props.setRecArtists(data.artists)
        props.setRecSrc(data.src)
      });
  };
  return <div onClick={recsButton}>Get Recommendations here</div>;
}

export default RecommendationsButton;
