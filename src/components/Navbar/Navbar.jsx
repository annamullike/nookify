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
          <h2>Nook me</h2>
          <div className={styles.links}>
            <ul>
              <li><AuthButton /></li>
              <Link></Link>
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
