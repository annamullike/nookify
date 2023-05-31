import React, { useState, useEffect } from "react";
function TopArtistsButton(props) {
  const [artists, setArtists] = useState([]);
  //   useEffect(() => {
  //     fetch("http://localhost:5000/api/spotify/topartists")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setArtists(data);
  //       });
  //   }, []);
  const button = () => {
    fetch("http://localhost:5000/api/spotify/topartists")
      .then((res) => res.json())
      .then((data) => {
        const names = [];
        const images = [];
        const ids = [];
        const genres = [];
        const obj = [];
        for (let i = 0; i < artists.data.length; i++) {
          const { genres: artistGenres, name, id } = artists.data[i];
          genres.push(...artistGenres);
          names.push(name);
          ids.push(id);
        }
        for (let i = 0; i < genres.length; i++) {
          if (!obj[genres[i]]) {
            obj[genres[i]] = 1;
          } else {
            obj[genres[i]]++;
          }
        }
        console.log(obj);
        // console.log(ids);
      });
  };
  return <a onClick={button}>Get Top Artists</a>;
}

export default TopArtistsButton;
