const SpotifyWebApi = require("spotify-web-api-node");
const redirectUri = "http://localhost:5000/api/spotify/callback";
const clientId = "dbd6bdd2c40c42c696176d6bd1d108d5";
//const clientSecret = "ab2e7731a06541af972c3a1e75f9d99b";
const fetch = require("node-fetch");
// const dotenv = require("dotenv")
// dotenv.config();
require("dotenv").config({ path: "config.env" });
const spotifyApi = new SpotifyWebApi({
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri,
  clientId: clientId,
});

const spotifyController = {};
//const accessToken = spotifyApi["_credentials"].accessToken || null;
//const refreshToken = spotifyApi["_credentials"].refreshToken || null;
spotifyController.search = async (req, res, next) => {
  const { query } = req.params;
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`, {
    headers: {
      Authorization: `Bearer ${spotifyApi["_credentials"].accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.locals.searchDataName = data.tracks.items;
      res.locals.searchDataImage = data.tracks.items;
      return next();
    });
};
spotifyController.getTopArtists = async (req, res, next) => {
  fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=25",
    {
      headers: {
        Authorization: `Bearer ${spotifyApi["_credentials"].accessToken}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const genres = [];
      const ids = [];
      const names = [];
      const genreObj = {};
      for (let i = 0; i < data.items.length; i++) {
        const { genres: artistGenres, name, id } = data.items[i];
        genres.push(...artistGenres);
        ids.push(id);
        names.push(name);
      }
      for (let i of genres) {
        if (!genreObj[i]) {
          genreObj[i] = 1;
        } else {
          genreObj[i]++;
        }
      }
      const top5Genres = Object.entries(genreObj)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([key]) => key);
      res.locals.top5Genres = top5Genres;
      res.locals.topArtistsData = data.items;
      console.log("MADE IT IN TOP ARTISTS")
      return next();
    });
};
spotifyController.getTopTracks = async (req, res, next) => {
  fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=25",
    {
      headers: {
        Authorization: `Bearer ${spotifyApi["_credentials"].accessToken}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const seed_tracks = [];
      const seed_artists = [];
      //console.log("in top tracks ", data.items[0].album)
      for (let i = 0; i < data.items.length; i++) {
        seed_tracks.push(data.items[i].album.id);
        seed_artists.push(data.items[i].album.artists[0].id);
      }

      res.locals.seedTracks = seed_tracks;
      res.locals.seedArtists = seed_artists;
      res.locals.topTrackData = data.items;
      console.log("MADE IT IN TOP TRACKS")
      return next();
    });
};
spotifyController.playTrack = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const { trackUri } = req.body;
    const uri = "spotify:track:" + trackUri;
    console.log("DEVICE HERE IN PLAYTRACK ", res.locals.nookifyDeviceId);
    console.log("ID HER EIN PLAYTRACK ", res.locals.nookifyDeviceId);
    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [uri],
        position_ms: 0,
        market: "US",
        device_id: res.locals.nookifyDeviceId,
      }),
    });

    if (!response.ok) {
      console.error("Error playing track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }

  return next();
};
spotifyController.recommendations = async (req, res, next) => {
  const { danceability, target_popuarity } = req.body;
  try {
    console.log("MADE IT IN THE RECOMMENDATIONS")
    const nums = [Math.floor(Math.random()*22),Math.floor(Math.random()*22),Math.floor(Math.random()*22)]
    const num = nums[Math.floor(Math.random()*nums.length)]
    const nums2 = [2,2,1]
    const seed_tracks = res.locals.seedTracks.slice(num,num+nums2[Math.floor(Math.random()*nums.length)]).join(",");
    const seed_artists = res.locals.seedArtists.slice(num,num+nums2[Math.floor(Math.random()*nums.length)]).join(",");
    const seed_genres = res.locals.top5Genres.slice(0,5).join(",").replaceAll(" ","%20")
    console.log("SEED artists ", seed_artists)
    console.log("seed tracks", seed_tracks)
    //console.log("genre ", seed_genres, " artists ", seed_artists, "tracks ", seed_tracks)
    const uri = `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}&seed_genres=${seed_genres}&seed_tracks=${seed_tracks}&limit=5`
    console.log(uri)
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    if (!response.ok) {
      console.error("Error transfer playback:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
    const recommendations = await response.json();
    console.log(recommendations);
    res.locals.recommendationsData = recommendations.tracks;
    res.locals.imgSrc = recommendations.tracks.map(obj => obj.album.images[0].url)
    res.locals.trackTitleData = recommendations.tracks.map(obj => obj.name)
    res.locals.titleIdData = recommendations.tracks.map(obj => obj.id)
    res.locals.artistNamesData = recommendations.tracks.map(obj => obj.album.artists[0].name)
    // console.log("ARTISTS HERE ", artistNames)
    console.log()
    // console.log("SONG TITLES HERE ", songTitles)
    return next();
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};
spotifyController.transferPlayback = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    console.log("in the transfer playback ", res.locals.nookifyDeviceId);
    const response = await fetch(`https://api.spotify.com/v1/me/player`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [res.locals.nookifyDeviceId],
      }),
    });
    if (!response.ok) {
      console.error("Error transfer playback:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
    return next();
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};
spotifyController.getDevice = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/devices`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error("Error ffwd track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    } else {
      const device = await response.json();
      console.log("DEVICES HERE ", device);
      //console.log(device)
      const nookifyDevice = device.devices.find(
        (i) => i.name === "Nookify Web Application"
      );
      if (nookifyDevice) {
        res.locals.nookifyDeviceId = nookifyDevice.id;
        // nookifyDevice.is_active = true;
        console.log("device after ", device);
      }
      console.log("device id", res.locals.nookifyDeviceId);
    }
    return next();
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};
spotifyController.currentTrack = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const { track } = req.body;
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error("Error ffwd track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};
spotifyController.likeTrack = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const { track } = req.body;
    const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: [track],
      }),
    });
    if (!response.ok) {
      console.error("Error ffwd track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
    return next();
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};
spotifyController.getAuthCode = async (req, res, next) => {
  const code = req.query.code;
  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);
      return next();
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
};
spotifyController.refreshToken = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    req.accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(data.body["access_token"]);
    req.testToken = data.body["access_token"];
    res.locals.accessToken = data.body["access_token"];
    return next();
  } catch (err) {
    console.log("Could not refresh access token", err);
  }
};
spotifyController.fastforward = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/previous`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error("Error ffwd track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};
spotifyController.rewind = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/previous`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error("Error pausing track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};

spotifyController.pauseTrack = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Error pausing track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};
spotifyController.playCurrent = async (req, res, next) => {
  try {
    // Refresh the access token
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    // const { trackUri } = req.body;
    // const uri = "spotify:track:" + trackUri;
    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error getting current track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }

  return next();
};

// spotifyController.playTrack = async (req, res, next) => {

//   const data = await spotifyApi.refreshAccessToken();
//     console.log("1111", spotifyApi["_credentials"].accessToken)
//     req.accessToken = data.body["access_token"];
//     spotifyApi.setAccessToken(data.body["access_token"]);
//     req.testToken = data.body["access_token"]

//   const { trackUri } = req.body;
//   const uri = "spotify:track:" + trackUri;
//   //const test = req.accessToken
//   const test = req.testToken
//   console.log("ok..........", test === spotifyApi["_credentials"].accessToken)
//   fetch(`http://api.spotify.com/v1/me/player/play`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${test}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "uris": [uri],
//       "position_ms": 0,
//       "market": "US"
//     }),
//   })
//     .then(async (response) => {
//       if (!response.ok) {
//         const hi = "hi"
//         console.error("Error playing track:", response.statusText);
//         console.error("Response object:", response);
//         const responseBody = await response.json();
//         console.error("Response body:", responseBody);
//         console.log(test)

//       }
//     })
//     .catch((error) => {
//       console.error("Error in fetch request:", error);
//     });
//   return next();
// };

module.exports = spotifyController;
/*
const checkAccessToken = (req, res, next) => {
  const expirationTime = spotifyApi["_credentials"].expires_in;
  const currentTime = Math.floor(new Date().getTime() / 1000);

  if (currentTime > expirationTime) {
    // Access token has expired, refresh it
    spotifyApi.refreshAccessToken().then(
      function(data) {
        console.log('The access token has been refreshed! ');
        spotifyApi.setAccessToken(data.body['access_token']);
        req.spotifyAccessToken = data.body['access_token'];
        return next();
      },
      function(err) {
        console.log('Could not refresh access token', err);
        return res.status(401).json({ error: 'Unauthorized' });
      }
    );
  } else {
    // Access token is still valid, pass it to the next handler
    req.spotifyAccessToken = spotifyApi["_credentials"].accessToken;
    return next();
  }
};
 */ // spotifyController.refreshToken = async (req,res,next) => {
//   spotifyApi.refreshAccessToken().then(
//     function(data) {
//       //console.log('The access token has been refreshed! ');
//       spotifyApi.setAccessToken(data.body['access_token']);
//       return next();
//     },
//     function(err) {
//       console.log('Could not refresh access token', err);
//     }
//   );
// }
// const data = await spotifyApi.refreshAccessToken();
// const accessToken = data.body["access_token"];
// spotifyApi.setAccessToken(accessToken);
// const { track } = req.body;
// fetch(`https://api.spotify.com/v1/me/player/devices`, {
//   headers: {
//     Authorization: "Bearer " + accessToken,
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     // Filter the devices by name
//     console.log("DEVICES HERE ", data)
//     const desiredDevice = data.devices.find(
//       (device) => device.name === "Nookify Web Application"
//     );
//     if (desiredDevice) {
//       const desiredDeviceId = desiredDevice.id;
//       res.locals.deviceId = desiredDeviceId
//       return next()
//     } else {
//       console.log("Device not found");
//     }
//   })
//   .catch((error) => {
//     console.error("Error retrieving devices:", error);
//   });
