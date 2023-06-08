import React, { useState } from "react";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setReduxSong } from "../../redux/songReducer";
function SearchForRecResults(props) {
    const dispatch = useDispatch()
  const { title, src, id, artist } = props;
  const [song, setSong] = useState("");
  const button = () => {
    console.log("hi ", id);
    setSong(id)
    dispatch(setReduxSong({
        song: id
    }))
  };
  return (
    
      <div onClick={button} className={styles.searchResults2}>
        <div className={styles.searchResultsContainer2}>
          <img width={"15%"} height={"20%"} src={src}></img>
          <div className={styles.info2}>
            <h3>{title}</h3>
            <h3>{artist}</h3>
          </div>
        </div>
      </div>
   
  );
}

export default SearchForRecResults;
