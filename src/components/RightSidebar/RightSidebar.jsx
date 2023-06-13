import React, { useContext, useEffect, useState } from "react";
import styles from "./RightSidebar.module.scss";
import { Dispatch } from "react";
import RecommendationsButton from "../Recommendations/RecommendationsButton";
import { useDispatch, useSelector } from "react-redux";
import { updateRecQuery } from "../../redux/recQueriesReducer";
import Card from "../Card/Card";
import Slider from "./Slider";
import RadioButtons from "../RadioButtons.jsx/RadioButtons";
import SearchForRec from "../Search/SearchForRec";
import SongContext from "../../redux/SongContext";
import SearchForRecArtist from "../Search/SearchForRecArtist";
import SdkPlayer from "../SdkPlayer/SdkPlayer";
function RightSidebar(props) {
  const song = useContext(SongContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  // const [val, setVal] = useState(5);
  const dispatch = useDispatch();
  const valence = useSelector((state) => state.recQueries.valence);
  const danceability = useSelector((state) => state.recQueries.danceability);
  const instrumentalness = useSelector(
    (state) => state.recQueries.instrumentalness
  );
  const popularity = useSelector((state) => state.recQueries.popularity);
  const speechiness = useSelector((state) => state.recQueries.speechiness);
  const recNames = useSelector((state) => state.recommendations.recNames);
  const recSrc = useSelector((state) => state.recommendations.recSrc);
  const recIds = useSelector((state) => state.recommendations.recIds);
  const recArtist = useSelector((state) => state.recommendations.recArtist);
  useEffect(() => {
    console.log(
      danceability,
      instrumentalness,
      speechiness,
      popularity,
      valence
    );
  }, [danceability, instrumentalness, speechiness, popularity, valence]);
  const playlistbutton = () => {
    fetch("http://localhost:5000/api/spotify/createplaylist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tracks: recIds,
      }),
    });
  };
  return (
    <div
      className={`${styles.container} ${sidebarVisible ? styles.visible : ""}`}
    >
      <div className={styles.button} onClick={toggleSidebar}>
        <svg
          id={styles.toggle}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <h1>Get Personalized Music here</h1>
          <SearchForRec />
          <SearchForRecArtist />
          <Slider
            query={"Danceability"}
            leftInfo={"couch potato"}
            rightInfo={"at a club"}
            val={danceability}
            change={(e) => {
              dispatch(
                updateRecQuery({
                  danceability: parseInt(e.target.value),
                })
              );
            }}
          />
          <Slider
            query={"Instrumentalness"}
            leftInfo={"back to basics"}
            rightInfo={"an orchestra please!"}
            val={instrumentalness}
            change={(e) => {
              dispatch(
                updateRecQuery({
                  instrumentalness: parseInt(e.target.value),
                })
              );
            }}
          />
          <Slider
            query={"Speechiness"}
            leftInfo={"no words please"}
            rightInfo={"linguist!"}
            val={speechiness}
            change={(e) => {
              dispatch(
                updateRecQuery({
                  speechiness: parseInt(e.target.value),
                })
              );
            }}
          />
          <Slider
            query={"Popularity"}
            leftInfo={"local bar music"}
            rightInfo={"top hits"}
            val={popularity}
            change={(e) => {
              dispatch(
                updateRecQuery({
                  popularity: parseInt(e.target.value),
                })
              );
            }}
          />
          <Slider
            query={"Positivity"}
            leftInfo={"least positive"}
            rightInfo={"most positive"}
            val={valence}
            change={(e) => {
              dispatch(
                updateRecQuery({
                  valence: parseInt(e.target.value),
                })
              );
            }}
          />

          <RadioButtons />

          <div className={styles.recButtons}>
            <RecommendationsButton
              recSrc={recSrc}
              recNames={recNames}
              recIds={recIds}
              recArtist={recArtist}
            /> 
            <button onClick={playlistbutton}>
              Add all these recs to a playlist!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
