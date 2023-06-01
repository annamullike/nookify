import React from "react";
import AuthButton from "../AuthButton";
import styles from "./Navbar.module.scss"
// import "../assets/styles.scss";
import { Link } from "react-router-dom";
function Navbar() {
  
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.container}>
          <h2>Nook meiii</h2>
          <div className={styles.links}>
            <ul>
              <li><AuthButton /></li>
              <li>Home</li>
              <li>About</li>
              <li onClick={recs}>Recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
