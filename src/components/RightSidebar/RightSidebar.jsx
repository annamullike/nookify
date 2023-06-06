import React, { useState } from "react";
import styles from "./RightSidebar.module.scss";
import RecommendationsButton from "../Recommendations/RecommendationsButton";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Slider from "./Slider";
function RightSidebar(props) {
  // const [val, setVal] = useState(5);
  const recNames = useSelector((state) => state.recommendations.recNames);
  const recSrc = useSelector((state) => state.recommendations.recSrc);
  const recIds = useSelector((state) => state.recommendations.recIds);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <RecommendationsButton
          recSrc={recSrc}
          recNames={recNames}
          recIds={recIds}
        />
        <Slider query={"Danceability"} leftInfo={"Least danceable"} rightInfo={"Most Danceable"}/>
        <Slider query={"Danceability"} leftInfo={"Least danceable"} rightInfo={"Most Danceable"}/>
      </div>
    </div>
  );
}

export default RightSidebar;
