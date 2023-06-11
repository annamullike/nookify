import React, { useState, useEffect } from "react";

function TopTracksButton(props) {
  const [tracks, setTracks] = useState([]);
  
  const button2 =  () => {
    fetch("http://localhost:5000/api/spotify/toptracks")
      .then((res) => res.json())
      .then((data) => {
        props.setTopArtist(data.artist)
        props.setTopNames(data.name);
        props.setTopImages(data.src);
        props.setIdTop(data.id);
      });
  };
  return <a onClick={button2}>Get Top Tracks</a>;
}

export default TopTracksButton;
