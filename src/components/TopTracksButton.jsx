import React, { useState, useEffect } from "react";

function TopTracksButton(props) {
  const [tracks, setTracks] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/spotify/toptracks")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTracks(data);
  //     });
  // }, []);
  const button2 =  () => {
    fetch("http://localhost:5000/api/spotify/toptracks")
      .then((res) => res.json())
      .then((data) => {
        // setTracks(data)
        // const names = [];
        // const images = [];
        // const id = [];
        // for (let i = 0; i < tracks.data.length; i++) {
        //   //images.push(tracks)
        //   images.push(tracks.data[i].album.images[1].url);
        //   names.push(tracks.data[i].name);
        //   id.push(tracks.data[i].id);
        // }
        
        props.setTopNames(data.name);
        props.setTopImages(data.src);
        props.setIdTop(data.id);
      });
  };
  // function button() {
  //   const names = [];
  //   const images = [];
  //   const id = [];
  //   for (let i = 0; i < tracks.data.length; i++) {
  //     //images.push(tracks)
  //     images.push(tracks.data[i].album.images[1].url);
  //     names.push(tracks.data[i].name);
  //     id.push(tracks.data[i].id)
  //   }
  //   console.log(tracks.data);
  //   props.setTopNames(names);
  //   props.setTopImages(images);
  //   props.setIdTop(id)
  // }
  return <a onClick={button2}>Get Top Tracks</a>;
}

export default TopTracksButton;
