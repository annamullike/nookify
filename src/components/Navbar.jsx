import React from "react";
import AuthButton from "./AuthButton";
import "../assets/styles.scss";
import spotifylogo from "../assets/Spotify_Logo_RGB_Green.png"
import logo from "../assets/foodifylogo.png"
function Navbar() {
  
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <img style={{margin:"0"}} src={logo} height={"90%"} width={"auto"} alt=""/>
           <h1 style={{margin:"0"}}>Made with</h1> <img height={"40%"} width={"auto"} src={spotifylogo} alt= ""/>
          {/* <div className="links">
            <ul>
              <li><AuthButton /></li>
              <li>Home</li>
              
              <li>About</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
