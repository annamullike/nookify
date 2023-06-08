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
function RightSidebar(props) {
  const song = useContext(SongContext)
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  // const [val, setVal] = useState(5);
  const dispatch = useDispatch();
  const valence = useSelector((state) => state.recQueries.valence)
  const danceability = useSelector((state) => state.recQueries.danceability);
  const instrumentalness = useSelector((state) => state.recQueries.instrumentalness);
  const popularity = useSelector((state) => state.recQueries.popularity)
  const speechiness = useSelector((state) => state.recQueries.speechiness)
  const recNames = useSelector((state) => state.recommendations.recNames);
  const recSrc = useSelector((state) => state.recommendations.recSrc);
  const recIds = useSelector((state) => state.recommendations.recIds);
  const recArtist = useSelector((state)=> state.recommendations.recArtist)
  useEffect(() => {
    console.log(danceability, instrumentalness, speechiness, popularity, valence);
  }, [danceability, instrumentalness, speechiness, popularity, valence]);
  return (
    <div className={`${styles.container} ${sidebarVisible ? styles.visible : ""}`}>
      <button className={styles.button} onClick={toggleSidebar}>Toggle</button>
      <div className={styles.content}>
        <h1>Get Personalized Music here</h1>
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
          leftInfo={"least popular"}
          rightInfo={"Most popular"}
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
          leftInfo={"Least positive"}
          rightInfo={"Most positive"}
          val={valence}
          change={(e) => {
            dispatch(
              updateRecQuery({
                valence: parseInt(e.target.value),
              })
            );
          }}
        />
        <h2>Choose one song to grow your recs upon</h2>
        <SearchForRec/>
        <RadioButtons/>
        <input></input>
        <div className={styles.recButton}><RecommendationsButton
          recSrc={recSrc}
          recNames={recNames}
          recIds={recIds}
          recArtist={recArtist}
        /></div>
        
      </div>
    </div>
  );
}

export default RightSidebar;
