import "./App.css";
import AuthButton from "./components/AuthButton";
import SearchButton from "./components/SearchButton";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import TopTracksButton from "./components/TopTracksButton";
import froggy from "./assets/froggy2.png"
import Player from "./components/Player";
function App() {
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  const [topImages, setTopImages] =useState([]);
  const [topNames, setTopNames] = useState([]);
  const [idT, setIdTop] = useState([]);
  const [idS, setIdSearch] = useState([]);
  return (
    <div>
      <Navbar/>
      <TopTracksButton setTopImages={setTopImages} setTopNames={setTopNames} setIdTop={setIdTop} />
      <SearchButton setImages={setImages} setNames={setNames} setIdSearch={setIdSearch} />
      <div className="contentBox">
      {topNames.length > 0 ?
        <div className="topContainer">
          {topNames.map((name,index)=>(
            <Card
            title={name}
            src={topImages[index]}
            id={idT[index]}
            key={index}
            />
          ))}
        </div>
        :<p></p>}
        
      </div> 
      <Player/>
    </div>
  );
}

export default App;
