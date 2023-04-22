import React from "react";
import AuthButton from "./AuthButton";
import "../assets/styles.scss";
function Navbar() {
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <h2>Nook me</h2>
          <div className="links">
            <ul>
              <li><AuthButton /></li>
              <li>Home</li>
              <li>About</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
