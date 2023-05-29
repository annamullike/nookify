import "./App.css";
import AuthButton from "./components/AuthButton";
import SearchButton from "./components/SearchButton";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import TopTracksButton from "./components/TopTracksButton";
import froggy from "./assets/froggy2.png";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import SdkPlayer from "./components/SdkPlayer";
function App() {
  // const [images, setImages] = useState([]);
  // const [names, setNames] = useState([]);
  const [topImages, setTopImages] = useState([]);
  const [topNames, setTopNames] = useState([]);
  const [idT, setIdTop] = useState([]);
  const [token, setToken] = useState("");
  const [device, setDevice] = useState("");
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
      .then((res) => res.json())
      .then((data) => {
        setDevice(data);
        console.log("device here", device);
      });
  };
  return (
    <div>
      <Navbar />
      <button onClick={getDevice}>DEVICE HERE</button>
      <button
        onClick={() => {
          console.log(token);
        }}
      ></button>
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
      {/* <Player/> */}
      <Sidebar />
    </div>
  );
}

export default App;
