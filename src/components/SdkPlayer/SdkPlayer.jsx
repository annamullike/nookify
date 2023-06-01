import React, { useEffect, useState } from "react";
import styles from "./SdkPlayer.module.scss"
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
            <button onClick={transfer}>transfer playback</button>
          ) : (
            <div className={styles.playerContent}>
              <img
                width={"20%"}
                height={"20%"}
                src={current_track.album.images[0].url}
                className="now-playing-cover"
                alt="none"
              />
              
            
              <div className={styles.right}>
                <div className={styles.currentTrack}>{current_track.name}</div>

                <div className={styles.currentArtist}>
                  {current_track.artists[0].name}
                </div>
                <div><a
                  className="btn-spotify"
                  onClick={() => {
                    player.previousTrack();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rewind" viewBox="0 0 16 16">
  <path d="M9.196 8 15 4.633v6.734L9.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z"/>
  <path d="M1.196 8 7 4.633v6.734L1.196 8Zm-.792-.696a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z"/>
</svg>
                  
                </a>

                <a
                  className="btn-spotify"
                  onClick={() => {
                    player.togglePlay();
                  }}
                >
                  
                  {is_paused ? <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-play-fill"
            viewBox="0 0 16 16"
          >
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause" viewBox="0 0 16 16">
  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
</svg>}
                </a>

                <a
                  className="btn-spotify"
                  onClick={() => {
                    player.nextTrack();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward" viewBox="0 0 16 16">
  <path d="M6.804 8 1 4.633v6.734L6.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
  <path d="M14.804 8 9 4.633v6.734L14.804 8Zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z"/>
</svg>
                </a></div>
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
