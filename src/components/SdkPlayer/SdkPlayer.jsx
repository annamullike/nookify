import React, { useEffect, useState } from "react";
import styles from "./SdkPlayer.module.scss";
import spotifyIcon from "../../assets/Spotify_Icon_RGB_Green.png";
import Notification from "../Notification/Notification";
function SdkPlayer(props) {
  const track = {
    name: "",
    album: {
      images: [{ url: "" }],
    },
    artists: [{ name: "" }],
  };
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [set, setSet] = useState(false);
  const [currId, setCurrId] = useState("");
  const [isSaved, setIsSaved] = useState(undefined)
  const [showNotif, setShowNotif] = useState(false);
  useEffect(() => {
     
  })
  const like = () => {
    fetch("http://localhost:5000/api/spotify/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track: currId,
      }),
    });
    console.log("made it in the like client side")
  };
  const unlike = () => {
    fetch("http://localhost:5000/api/spotify/unlike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track: currId,
      }),
    });
  }
  const checkTrack = async () => {
    const response = await fetch(`http://localhost:5000/api/spotify/checktrack/${currId}`)
    const isSaved = await response.json()
    if (isSaved.boolean[0] === true) {
      setIsSaved(true)
      setShowNotif(true)
      setTimeout(()=> {
        setShowNotif(false);
      }, 3000)
      unlike(currId)
    } else if (isSaved.boolean[0] === false) {
      setIsSaved(false)
      setShowNotif(true)
      setTimeout(()=> {
        setShowNotif(false);
      }, 3000)
      like(currId)

    }
  }

  const transfer = () => {
    setSet(true);
    fetch("http://localhost:5000/api/spotify/transfer")
      .then((res) => res.json())
      .then((data) => {
        console.log("transfered playback devices");
      });
  };
  useEffect(() => {
    const initializePlayer = async () => {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      await new Promise((resolve) => {
        window.onSpotifyWebPlaybackSDKReady = resolve;
      });

      const player = new window.Spotify.Player({
        name: "Nookify Web Application",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        // setActive(true)
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          console.log("none");
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setCurrId(state.track_window.current_track.id);
        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };

    initializePlayer();
    // setActive(true)
  }, []);
  return (
    <>
      
      <div className={styles.player}>
        <div className="player-container">
          {!set ? (
            <button onClick={transfer}>Listen here!</button>
          ) : (
            <div className={styles.playerContent}>
              <img id={styles.imgAlbum}
                width={"20%"}
                height={"20%"}
                src={current_track.album.images[0].url}
                className="now-playing-cover"
                alt="none"
              />

              <div className={styles.right}>
                <div className={styles.currentTrack}>
                  <div className={styles.spot}>
                    {current_track.name}

                    <img id={styles.spotifyIcon} src={spotifyIcon} />
                  </div>
                </div>

                <div className={styles.currentArtist}>
                  {current_track.artists[0].name}
                </div>
                <div className={styles.albumName}>{current_track.album.name}</div>
                <div className={styles.thirdLine}>
                  <div className={styles.onlyButtons}>
                    <a
                      className="btn-spotify"
                      onClick={() => {
                        player.previousTrack();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-rewind"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.196 8 15 4.633v6.734L9.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z" />
                        <path d="M1.196 8 7 4.633v6.734L1.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z" />
                      </svg>
                    </a>

                    <a
                      className="btn-spotify"
                      onClick={() => {
                        player.togglePlay();
                      }}
                    >
                      {is_paused ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-play-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pause"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                        </svg>
                      )}
                    </a>

                    <a
                      className="btn-spotify"
                      onClick={() => {
                        player.nextTrack();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-fast-forward"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.804 8 1 4.633v6.734L6.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                        <path  d="M14.804 8 9 4.633v6.734L14.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                      </svg>
                      
                    </a>

                    

                  </div><div className={styles.onlyLike}>
                      <a onClick={checkTrack}>
                      <svg width="150" height="150" viewBox="0 0 150 150" fillOpacity="1"   xmlns="http://www.w3.org/2000/svg">
<path d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z"   fill="#c48d3f"/>
</svg>

                      </a>
                    </div>
                </div>
                {/* <a onClick={transfer}>Transfer</a> */}
                {isSaved && showNotif ? (
  <Notification message={"REMOVED FROM TRACKS"} />
) : (
  !isSaved && showNotif && <Notification message={"LIKED SONG"} />
)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SdkPlayer;

// function SdkPlayer() {
//   const [accessToken, setAccessToken] = useState("");
//   useEffect(async () => {
//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;
//     document.body.appendChild(script);
//     const token = await fetch("http://localhost:5000/api/spotify/accesstoken")
//       .then((res) => res.json())
//       .then((data) => {
//         setAccessToken(data.token);
//       });
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const player = new Spotify.Player({
//         name: "Nookify",
//         getOAuthToken: (cb) => {
//           cb(accessToken);
//         },
//       });
//       player.connect();
//       player.addListener("player_state_changed", (state) => {
//         console.log("Player state changed: ", state);
//       });
//       return () => {
//         document.body.removeChild(script);
//         delete window.onSpotifyWebPlaybackSDKReady;
//       };
//     };
//   }, [accessToken]);
//   const resume = () => {
//     player.resume().then(() => {
//         console.log("resumed")
//     })
//   }
//   return (
//     <div>
//       <div id="spotify-player-container">
//         <div onClick={resume}>RESUME HERE</div>
//       </div>
//     </div>
//   );
// }

// export default SdkPlayer;
