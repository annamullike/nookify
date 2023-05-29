import React, { useEffect, useState } from "react";

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
  }, [props.token]);

  return (
    <>
      <div className="player">
        <div className="player-container">
          <button onClick={()=>{setActive(true)}}>START PLAYBACK</button>
          <img
            src={current_track.album.images[0].url}
            className="now-playing__cover"
            alt="none"
          />

          <div className="now-playing__side">
            <div className="now-playing__name">{current_track.name}</div>

            <div className="now-playing__artist">
              {current_track.artists[0].name}
            </div>
            <button
              className="btn-spotify"
              onClick={() => {
                player.previousTrack();
              }}
            >
              &lt;&lt;
            </button>

            <button
              className="btn-spotify"
              onClick={() => {
                player.togglePlay();
              }}
            >
              {is_paused ? "PLAY" : "PAUSE"}
            </button>

            <button
              className="btn-spotify"
              onClick={() => {
                player.nextTrack();
              }}
            >
              &gt;&gt;
            </button>
          </div>
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
