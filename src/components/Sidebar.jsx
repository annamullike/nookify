import React from "react";
import Player from "./Player";
import SearchButton from "./SearchButton";
import "../assets/styles.scss";
import SdkPlayer from "./SdkPlayer";
function Sidebar() {
  return (
    <div className="sidebarContainer">
      <div className="sidebar">
        <SearchButton />
        {/* <Player /> */}
        <SdkPlayer/>
      </div>
    </div>
  );
}

export default Sidebar;
