import React, { useEffect, useState } from "react";
import styles from "./RightSidebar.module.scss";
import { Dispatch } from "react";
import RecommendationsButton from "../Recommendations/RecommendationsButton";
import { useDispatch, useSelector } from "react-redux";
import { updateRecQuery } from "../../redux/recQueriesReducer";
import Card from "../Card/Card";
import Slider from "./Slider";
function RightSidebar(props) {
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
  useEffect(() => {
    console.log(danceability, instrumentalness, speechiness, popularity);
  }, [danceability, instrumentalness, speechiness, popularity]);
  return (
    <div className={styles.container}>
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
          query={"instr"}
          leftInfo={"least instrum"}
          rightInfo={"Most instrum"}
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
          leftInfo={"least words"}
          rightInfo={"Most words"}
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
          leftInfo={"least pop"}
          rightInfo={"Most pop"}
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
          query={"Valence"}
          leftInfo={"least valence"}
          rightInfo={"Most valence"}
          val={valence}
          change={(e) => {
            dispatch(
              updateRecQuery({
                valence: parseInt(e.target.value),
              })
            );
          }}
        />
        <input type="text" id="searchInput" placeholder="Enter country"/>
        <ul id="searchResults"></ul>
        <RecommendationsButton
          recSrc={recSrc}
          recNames={recNames}
          recIds={recIds}
        />
        <button onClick={()=>console.log("DANCEY ",danceability, instrumentalness)}>check redux vars</button>
      </div>
    </div>
  );
}

export default RightSidebar;
