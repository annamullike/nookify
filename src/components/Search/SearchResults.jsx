import React from "react";
import styles from "./Search.module.scss"
function SearchResults(props) {
  const { title, src, id, artist} = props;
  const like = () => {
    fetch("http://localhost:5000/api/spotify/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track: id,
      }),
    });
  }
  const play = () => {
    fetch("http://localhost:5000/api/spotify/playtrack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trackUri: id,
      }),
    });
  };
  return (
    <div className={styles.searchResults}>
      <div className={styles.searchResultsContainer} >
          <img onClick={play} width={"20%"} height={"20%"} src={src}></img>
          <div onClick={play} className={styles.info}><h3>{title}</h3>
          <h3>{artist}</h3></div>
          <a onClick={like}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg></a>
          
      </div>
    </div>
  );
}

export default SearchResults;
