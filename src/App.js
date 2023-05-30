
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
function App() {
  // const [images, setImages] = useState([]);
  // const [names, setNames] = useState([]);
  const [topImages, setTopImages] = useState([]);
  const [topNames, setTopNames] = useState([]);
  const [idT, setIdTop] = useState([]);
  const [token, setToken] = useState("");
  const [device, setDevice] = useState("");
  const transfer = () => {
    fetch("http://localhost:5000/api/spotify/transfer")
      .then((res) => res.json())
      .then((data) => {
        console.log("transfered playback devices")
      })
  }
  useEffect(() => {
    fetch("http://localhost:5000/api/spotify/accesstoken")
      .then((res) => res.json())
      .then((data) => {
        console.log("token here ", data.token);
        setToken(data.token);
      });
  }, []);
  const getDevice = () => {
    fetch("http://localhost:5000/api/spotify/getdevice")
      
  };
  return (
    <div>
      <Navbar />
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
      </div>
      
      <Sidebar />
    </div>
  );
}

export default App;
