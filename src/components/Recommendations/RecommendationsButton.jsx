// import React, { useState } from "react";
// import styles from "./Recommendations.module.scss";
// import { useDispatch } from "react-redux";
// import { updateRecommendations } from "../../redux/recommendationsReducer";
// function RecommendationsButton(props) {
//   // const [recs, setRecs] = useState([]);
//   const dispatch = useDispatch();
//   const recsButton = () => {
//     fetch("http://localhost:5000/api/spotify/recommendations")
//       .then((res) => res.json())
//       .then((data) => {
//         dispatch(
//           updateRecommendations({
//             recNames: data.names,
//             recIds: data.ids,
//             recSrc: data.src,
//           })
          
//         );
//         // console.log(data);
//         // props.setRecNames(data.names)
//         // props.setRecIds(data.ids)
//         // // props.setRecArtists(data.artists)
//         // props.setRecSrc(data.src)
//         console.log(data.names)
//       });
//   };
//   return <div onClick={recsButton}>Get Recommendations here</div>;
// }

// export default RecommendationsButton;

import React from "react";
import { useDispatch } from "react-redux";
import { updateRecommendations } from "../../redux/recommendationsReducer";

function RecommendationsButton() {
  
const dispatch = useDispatch();
  const recsButton = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/api/spotify/recommendations");
      const data = await response.json();
      // console.log("data hereee ", data.names)
      dispatch(
        updateRecommendations({
          recNames: data.names,
          recIds: data.ids,
          recSrc: data.src,
        })
      );
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };
  // const recsButton = () => {
  //   fetch("http://localhost:5000/api/spotify/recommendations")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatch(
  //         updateRecommendations({
  //           recNames: data.names,
  //           recIds: data.ids,
  //           recSrc: data.src,
  //         })
  //       );
  //     });
  // };

  return (
    <button onClick={recsButton}>Get Recommendations here</button>
  );
}

export default RecommendationsButton;
