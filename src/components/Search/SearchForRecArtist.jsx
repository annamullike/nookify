import React, {useState, useEffect} from "react";
import styles from "./Search.module.scss"

import SearchForRecArtist from "./SearchForRecResults";
function SearchForRec() {
  const [searchData, setSearchData] = useState([]);
  const [input, setInput] = useState("");
    let limit = 2;
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
  return <div>
    <input className={styles.input} placeholder={"Search song..."}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      {input && searchData.data && (
        <div className={"searchResults"}>
          {searchData.data.map((result, index) => (
            <SearchForRecResults
            title={result.name}
            id={result.id}
            src={result.album.images[1].url}
            artist={result.album.artists[0].name}
            />
          ))}
        </div>
      )}
  </div>;
}

export default SearchForRecArtist;
