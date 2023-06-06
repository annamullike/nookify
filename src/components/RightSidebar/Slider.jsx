import React, { useState } from "react";
import styles from "./RightSidebar.module.scss";
function Slider(props) {
  const [val, setVal] = useState(5);
  return (
    <div className={styles.sliderContainer}>
      <h3>{props.query}</h3>
      <div className={styles.info}>
        <h4 id={styles.left}>{props.leftInfo}</h4>
        <h4 id={styles.right}>{props.rightInfo}</h4>
      </div>

      <input
        onChange={(e) => setVal(parseInt(e.target.value))}
        type="range"
        min="0"
        max="10"
        value={val}
        className={styles.slider}
        id="myRange"
      />
    </div>
  );
}

export default Slider;
