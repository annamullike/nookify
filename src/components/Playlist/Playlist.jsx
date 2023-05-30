import React from 'react'
import styles from "./Playlist.module.scss"
function Playlist() {
  return (
    <div className={styles.playlistContainer}>
        <div className={styles.playlist}>
            Your Playlists
        </div>
    </div>
  )
}

export default Playlist