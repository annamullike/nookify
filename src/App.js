import AuthButton from "./components/AuthButton";
import SearchButton from "./components/Search/SearchButton";
import React, { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar";
import TopTracksButton from "./components/TopTracksButton";

import Sidebar from "./components/Search/Sidebar";
import SdkPlayer from "./components/SdkPlayer/SdkPlayer";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import TopArtistsButton from "./components/TopArtists/TopArtistsButton";

import { useDispatch, useSelector} from "react-redux";
function App() {
  
  const dispatch = useDispatch();
  const recNames = useSelector((state) => state.recommendations.recNames);
  const recSrc = useSelector((state) => state.recommendations.recSrc);
  const recIds = useSelector((state) => state.recommendations.recIds);
  const recArtist = useSelector((state)=> state.recommendations.recArtist)
  const [topImages, setTopImages] = useState([]);
  const [topNames, setTopNames] = useState([]);
  const [idT, setIdTop] = useState([]);
  const [topArtist, setTopArtist] = useState([])
  const [token, setToken] = useState("");


 
  useEffect(() => {
    fetch("http://localhost:5000/api/spotify/accesstoken")
      .then((res) => res.json())
      .then((data) => {
        console.log("token here ", data.token);
        setToken(data.token);
      });
  }, []);
  
  return (
    <div>
      <Navbar />
      <TopTracksButton
        setTopImages={setTopImages}
        setTopNames={setTopNames}
        setIdTop={setIdTop}
        setTopArtist={setTopArtist}
      />
      <TopArtistsButton />
      {token === "" ? <AuthButton /> : <SdkPlayer token={token} />}

      <div className="contentBox">
      {recNames.length > 0 ? (
          <div className="topContainer">
            {recNames.map((name, index) => (
              <Card
                title={name}
                src={recSrc[index]}
                id={recIds[index]}
                key={index}
                artist={recArtist[index]}
              />
            ))}
          </div>
        ) : (
          <p></p>
        )}
        {topNames.length > 0 ? (
          <div className="topContainer">
            {topNames.map((name, index) => (
              <Card
                title={name}
                src={topImages[index]}
                id={idT[index]}
                key={index}
                artist={topArtist[index]}
              />
            ))}
          </div>
        ) : (
          <p></p>
        )}
        {console.log("recNames:", recNames)}
  
        
      </div>

      <Sidebar />
      <RightSidebar />
    </div>
  );
}

export default App;
