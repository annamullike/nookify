import React, { useState } from "react";
import styles from "./RightSidebar.module.scss";
import { useDispatch } from "react-redux";
function Slider(props) {
  const [val, setVal] = useState(0);
  const dispatch = useDispatch()
//   const change = (e) => {
//     dispatch(setValue(parseInt(e.target.value)))
//   }
  return (
    <div className={styles.sliderContainer}>
      <h3>{props.query}</h3>
      <div className={styles.info}>
        <h4 id={styles.left}>{props.leftInfo}</h4>
        <h4 id={styles.right}>{props.rightInfo}</h4>
      </div>

      <input
        onChange={props.change}
        type="range"
        min="0"
        max="10"
        value={props.val}
        className={styles.slider}
        id="myRange"
      />
    </div>
  );
}

export default Slider;
