import React, { useState } from "react";
import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setReduxSong } from "../../redux/songReducer";
function SearchForRecArtistResults(props) {
  const dispatch = useDispatch();
  const { src, id, artist } = props;
  const omg = useSelector((state)=> state.song.artist)
  const button = () => {
    console.log("hi ", id);

    dispatch(
      setReduxSong({
        artist: id,
      })
    );
  };
  return (
    <div onClick={button} className={styles.searchResults2}>
      <button onClick={()=>console.log(omg)}>hihi</button>
      <div className={styles.searchResultsContainer2}>
        <img width={"15%"} height={"20%"} src={src}></img>
        <div className={styles.info2}>
          <h3>{artist}</h3>
        </div>
      </div>
    </div>
  );
}

export default SearchForRecArtistResults;
