import AuthButton from "./components/AuthButton";
import SearchButton from "./components/Search/SearchButton";
import React, { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar";
import TopTracksButton from "./components/TopTracksButton";
import froggy from "./assets/froggy2.png";
// import Player from "./components/Player";
import Sidebar from "./components/Search/Sidebar";
import SdkPlayer from "./components/SdkPlayer/SdkPlayer";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import TopArtistsButton from "./components/TopArtists/TopArtistsButton";
import RecommendationsButton from "./components/Recommendations/RecommendationsButton";
import { useDispatch, useSelector} from "react-redux";
import { updateRecommendations } from "./redux/recommendationsReducer";
function App() {
  // const dispatch = useDispatch();
  // const [recSrc, setRecSrc] = useState([])
  // const [recNames, setRecNames] = useState([])
  // const [recIds, setRecIds] = useState([])
  const dispatch = useDispatch();
  const recNames = useSelector((state) => state.recommendations.recNames);
  const recSrc = useSelector((state) => state.recommendations.recSrc);
  const recIds = useSelector((state) => state.recommendations.recIds);
  const [topImages, setTopImages] = useState([]);
  const [topNames, setTopNames] = useState([]);
  const [idT, setIdTop] = useState([]);
  const [token, setToken] = useState("");
  const [device, setDevice] = useState("");
  const transfer = () => {
    fetch("http://localhost:5000/api/spotify/transfer")
      .then((res) => res.json())
      .then((data) => {
        console.log("transfered playback devices");
      });
  };
 
  useEffect(() => {
    fetch("http://localhost:5000/api/spotify/accesstoken")
      .then((res) => res.json())
      .then((data) => {
        console.log("token here ", data.token);
        setToken(data.token);
      });
  }, []);
  const getDevice = () => {
    fetch("http://localhost:5000/api/spotify/getdevice");
  };
  return (
    <div>
      <Navbar />

      {/* <RecommendationsButton setRecSrc={setRecSrc} setRecNames={setRecNames} setRecIds={setRecIds}  /> */}
      {/* <button onClick={transfer}>transfer playback here</button>
      <button onClick={getDevice}>DEVICE HERE</button> */}
      {/* <button
        onClick={() => {
          console.log(token);
        }}
      ></button> */}
      <TopTracksButton
        setTopImages={setTopImages}
        setTopNames={setTopNames}
        setIdTop={setIdTop}
      />
      <TopArtistsButton />
      {token === "" ? <AuthButton /> : <SdkPlayer token={token} />}
      {/* <SearchButton setImages={setImages} setNames={setNames} setIdSearch={setIdSearch} /> */}
      <div className="contentBox">
        {topNames.length > 0 ? (
          <div className="topContainer">
            {topNames.map((name, index) => (
              <Card
                title={name}
                src={topImages[index]}
                id={idT[index]}
                key={index}
              />
            ))}
          </div>
        ) : (
          <p></p>
        )}
        {console.log("recNames:", recNames)}
  
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

      <Sidebar />
      <RightSidebar />
    </div>
  );
}

export default App;
