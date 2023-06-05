import React, {useState} from 'react'
import styles from "./RightSidebar.module.scss"
import RecommendationsButton from '../Recommendations/RecommendationsButton'
import Card from '../Card/Card';
function RightSidebar({ recNames, recSrc, recIds }) {
  const [val, setVal] = useState(0);
  const [recSrc, setRecSrc] = useState([])
  const [recNames, setRecNames] = useState([])
  const [recIds, setRecIds] = useState([])
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <RecommendationsButton setRecSrc={setRecSrc} setRecNames={setRecNames} setRecIds={setRecIds}  />


      <div className={styles.sliderContainer}>
  <input onChange={(e)=>setVal(e.target.value)} type="range" min="1" max="10" value="5" className={styles.slider} id="myRange"/>
</div>

{recNames.length > 0 ? (
          <div className="topContainer">
            {recNames.map((name, index) => (
              <Card
                title={name}
                src={recSrc[index]}
                id={recIds[index]}
                key={index}
              />
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  )
}

export default RightSidebar