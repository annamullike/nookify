const SpotifyWebApi = require("spotify-web-api-node");
const redirectUri = "http://localhost:5000/api/spotify/callback";
const clientId = "dbd6bdd2c40c42c696176d6bd1d108d5";
//const clientSecret = "ab2e7731a06541af972c3a1e75f9d99b";
const fetch = require("node-fetch");
// const dotenv = require("dotenv")
// dotenv.config();
require('dotenv').config({ path: 'config.env' });
const spotifyApi = new SpotifyWebApi({
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri,
  clientId: clientId,
});

const spotifyController = {};
//const accessToken = spotifyApi["_credentials"].accessToken || null;
//const refreshToken = spotifyApi["_credentials"].refreshToken || null;
spotifyController.search = async (req, res, next) => {
  const {query} = req.params;
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
    headers: {
      Authorization: `Bearer ${spotifyApi["_credentials"].accessToken}`,
    },
  }).then((res) => res.json()).then((data) => {
    res.locals.searchDataName = data.tracks.items;
    res.locals.searchDataImage = data.tracks.items
    return next();
  })
}


spotifyController.getTopTracks = async (req, res, next) => {
  fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    {
      headers: {
        Authorization: `Bearer ${spotifyApi["_credentials"].accessToken}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      res.locals.topTrackData = data.items
      return next();
    });
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
    req.testToken = data.body["access_token"]
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
    const response = await fetch(`https://api.spotify.com/v1/me/player/previous`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      console.error("Error ffwd track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
}
spotifyController.rewind = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const response = await fetch(`https://api.spotify.com/v1/me/player/previous`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      console.error("Error pausing track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
}

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
    })
    if (!response.ok) {
      console.error("Error pausing track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error in fetch request:", error);

  }
}
spotifyController.playCurrent = async (req, res, next) => {
  try {
    // Refresh the access token
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const { trackUri } = req.body;
    const uri = "spotify:track:" + trackUri;
    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
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
spotifyController.playTrack = async (req, res, next) => {
  try {
    // Refresh the access token
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const { trackUri } = req.body;
    const uri = "spotify:track:" + trackUri;
    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [uri],
        position_ms: 0,
        market: "US"
      }),
    });
  
    if (!response.ok) {
      console.error("Error playing track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
      // Handle the error as needed
    }
  } catch (error) {
    console.error("Error in fetch request:", error);
    // Handle the error as needed
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
 */// spotifyController.refreshToken = async (req,res,next) => {
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