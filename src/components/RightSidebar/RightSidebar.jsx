import React, {useState} from 'react'
import styles from "./RightSidebar.module.scss"
import RecommendationsButton from '../Recommendations/RecommendationsButton'
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
function RightSidebar(props) {
  const [val, setVal] = useState(0);
  const recNames = useSelector((state) => state.recommendations.recNames);
  const recSrc = useSelector((state) => state.recommendations.recSrc);
  const recIds = useSelector((state) => state.recommendations.recIds);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <RecommendationsButton recSrc={recSrc} recNames={recNames} recIds={recIds}  />


      <div className={styles.sliderContainer}>
  <input onChange={(e)=>setVal(e.target.value)} type="range" min="1" max="10" value="5" className={styles.slider} id="myRange"/>
</div>

      </div>
    </div>
  )
}

export default RightSidebar