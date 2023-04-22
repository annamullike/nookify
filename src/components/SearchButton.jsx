import React, { useEffect, useState } from "react";

function SearchButton(props) {
  const [searchData, setSearchData] = useState([]);
  const [input, setInput] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/spotify/search/${input}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
        //console.log("DATA HERE",searchData);
      },[]);
  })
  function getSearchData() {
    const names = [];
    const images = [];
    const id = [];
    for (let i = 0; i < searchData.data.length; i++) {
        names.push(searchData.data[i].name)
        images.push(searchData.data[i].album.images[1].url)
        id.push(searchData.data[i].id)
    }
    console.log(searchData.data)
    props.setImages(images)
    props.setNames(names)
    props.setIdSearch(id)
    //console.log("NAMES ",names)
    //console.log("URLS ",images)
  }
  return (
    <div className="search">
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <a onClick={getSearchData}>Search</a>
    </div>
  );
}

export default SearchButton;
