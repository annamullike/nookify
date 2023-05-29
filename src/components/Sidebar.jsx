import React from "react";
import Player from "./Player";
import SearchButton from "./SearchButton";
import "../assets/styles.scss";
function Sidebar() {
  return (
    <div className="sidebarContainer">
      <div className="sidebar">
        <SearchButton />
      </div>
    </div>
  );
}

export default Sidebar;
