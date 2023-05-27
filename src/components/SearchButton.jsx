import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
import "../assets/styles.scss";
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

  // function getSearchData() {
  //   const names = [];
  //   const images = [];
  //   const id = [];
  //   for (let i = 0; i < searchData.data.length; i++) {
  //     names.push(searchData.data[i].name);
  //     images.push(searchData.data[i].album.images[1].url);
  //     id.push(searchData.data[i].id);
  //   }
  //   props.setImages(images);
  //   props.setNames(names);
  //   props.setIdSearch(id);
  // }

  return (
    <div className="search">
      <input className="input" placeholder={"Search song..."}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>

      {/* <a onClick={getSearchData}>Search</a> */}
      {input && searchData.data && (
        <div className="searchResults">
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
