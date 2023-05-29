import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
// import "../assets/styles.scss";
import styles from "./Search.module.scss"
function SearchButton(props) {
  const [searchData, setSearchData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input) {
      fetch(`http://localhost:5000/api/spotify/search/${input}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchData(data);
        });
    } else {
      setSearchData([]);
    }
  }, [input]);

  return (
    <div className={styles.search}>
      <input className={styles.input} placeholder={"Search song..."}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>

      {/* <a onClick={getSearchData}>Search</a> */}
      {input && searchData.data && (
        <div className={"searchResults"}>
          {searchData.data.map((result, index) => (
            <SearchResults
            title={result.name}
            id={result.id}
            src={result.album.images[1].url}
            artist={result.album.artists[0].name}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchButton;
