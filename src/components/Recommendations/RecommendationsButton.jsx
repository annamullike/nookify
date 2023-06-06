import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { updateRecommendations } from "../../redux/recommendationsReducer";

function RecommendationsButton() {
  const dispatch = useDispatch();
  const [danceabilitiy, setDanceabilitiy] = useState("")
  const recsButton = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/spotify/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({danceabilitiy: danceabilitiy})
        }
      );
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

  return <button onClick={recsButton}>Get Recommendations here</button>;
}

export default RecommendationsButton;
