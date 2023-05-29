import React from "react";

import SearchResults from "./SearchResults";
import SearchButton from "./SearchButton";
import styles from "./Search.module.scss"

function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <SearchButton />
      </div>
    </div>
  );
}

export default Sidebar;
