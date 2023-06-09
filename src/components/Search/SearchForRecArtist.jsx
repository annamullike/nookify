import React, { useState, useEffect } from "react";
import styles from "./Search.module.scss";

import SearchForRecArtistResults from "./SearchForRecArtistResults";
function SearchForRecArtist() {
  const [searchData, setSearchData] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    if (input) {
      fetch(`http://localhost:5000/api/spotify/searchartist/${input}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchData(data);
        });
    } else {
      setSearchData([]);
    }
  }, [input]);
  return (
    <div>
      <h2 style={{ margin: 0 }}>Choose one ARTIST to grow your recs upon!</h2>
      <input
        className={styles.input}
        placeholder={"Search song..."}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>

      {input && searchData.data && (
        <div className={"searchResults"}>
          <SearchForRecArtistResults
            id={searchData.data.artists.items[0].id}
            src={searchData.data.artists.items[0].images[0].url}
            artist={searchData.data.artists.items[0].name}
          />
        </div>
      )}
    </div>
  );
}

export default SearchForRecArtist;
