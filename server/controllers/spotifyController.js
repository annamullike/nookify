const SpotifyWebApi = require("spotify-web-api-node");
const redirectUri = "http://localhost:5000/api/spotify/callback";
const clientId = "dbd6bdd2c40c42c696176d6bd1d108d5";
const fetch = require("node-fetch");

require("dotenv").config({ path: "config.env" });
const spotifyApi = new SpotifyWebApi({
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri,
  clientId: clientId,
});

const spotifyController = {};
spotifyController.searchArtist = async (req, res, next) => {
  const { query } = req.params;

let uri = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`
  console.log(uri, query)
  
  fetch(uri, {
    headers: {
      Authorization: `Bearer ${spotifyApi["_credentials"].accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.locals.searchDataName = data //.artists.items[0].id
      return next();
    });
};
spotifyController.search = async (req, res, next) => {
  const { query } = req.params;
  const {lim} = req.query;
  let uri;
  if (lim === 1 || lim === "1") {
    uri = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`
  } else {
    uri = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`
  }
  console.log(uri,lim, query)
  // let uri = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`
  fetch(uri, {
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
      res.locals.top5Genres = Object.entries(genreObj)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([key]) => key);
        res.locals.top10Genres = Object.entries(genreObj)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 15)
        .map(([key]) => key);
      // res.locals.top5Genres = top5Genres;
      res.locals.topArtistsData = data.items;
      return next();
    });
};
spotifyController.getTopTracks = async (req, res, next) => {
  fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20",
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
      for (let i = 0; i < data.items.length; i++) {
        seed_tracks.push(data.items[i].album.id);
        seed_artists.push(data.items[i].album.artists[0].id);
      }
      res.locals.artistNames = data.items.map((obj) =>obj.album.artists[0].name)
      res.locals.seedTracks = data.items.map((obj) => obj.id);
      res.locals.topName = data.items.map((obj) => obj.name);
      res.locals.seedArtists = data.items.map((obj) => obj.album.artists[0].id);
      res.locals.topImgSrc = data.items.map((obj) => obj.album.images[1].url);
      res.locals.topTrackData = data.items;
      res.locals.testingIdData = data.items.map((obj) => obj.album.id);
      console.log(res.locals.seedTracks);
      console.log("MADE IT IN TOP TRACKS");
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
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const nums = [
      Math.floor(Math.random() * 22),
      Math.floor(Math.random() * 22),
      Math.floor(Math.random() * 22),
    ];
    
    const num = nums[Math.floor(Math.random() * nums.length)];
    let { danceability, popularity, speechiness, instrumentalness, valence, genres, song, artist } =
      req.body;
      console.log(genres)
    if (genres.length === 0) {
      genres = res.locals.top5Genres
      .slice(0, 5)
      .join(",")
      .replaceAll(" ", "+");
    } else {
      genres = genres.join(",").replaceAll(" ", "+")
      console.log("USERS PICKED GENRES HERE ",genres, "<<length",genres)
    }
    let seed_tracks = res.locals.seedTracks.slice(num, num + 2).join(",");
    
    if (song!==undefined || song !== "" || song !==null) {
      seed_tracks = song
    }
    
    let seed_artists = res.locals.seedArtists.slice(num, num + 1).join(",");
    if (artist!==undefined || artist !== "" || artist !==null) {
      seed_artists = artist;
    }
    let uri = `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}&seed_genres=${genres}&seed_tracks=${seed_tracks}&limit=12`;
    // &target_popularity=${popularity}&target_instrumentalness=${instrumentalness}&target_speechiness=${speechiness}&target_danceability=${danceability}&target_valence=${valence}`
    if (popularity !== undefined) uri += `&target_popularity=${popularity*10}`;
    if (danceability !== undefined)
      uri += `&target_danceability=${danceability*.1}`;
    if (speechiness !== undefined) uri += `&target_speechiness=${speechiness*.1}`;
    if (instrumentalness !== undefined)
      uri += `&target_instrumentalness=${instrumentalness*.1}`;
    if (valence !== undefined) uri += `&target_valence=${valence*.1}`;
    console.log("url here, ", uri )
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      console.error("Error transfer playback:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
    const recommendations = await response.json();
    res.locals.recommendationsData = recommendations.tracks;
    res.locals.imgSrc = recommendations.tracks.map(
      (obj) => obj.album.images[1].url
    );
    res.locals.trackTitleData = recommendations.tracks.map((obj) => obj.name);
    res.locals.titleIdData = recommendations.tracks.map((obj) => obj.id);
    res.locals.artistNamesData = recommendations.tracks.map(
      (obj) => obj.album.artists[0].name
    );
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
    // const { track } = req.body;
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
    else{
      currentResponse = await response.json()
      res.locals.currTrack = currentResponse.item.artists[0].id
    return next()
    }
    
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
};
spotifyController.checkTrack = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const { song } = req.params;
    console.log("THE SONG MADE IT HERE ", song)
    const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${song}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Error ffwd track:", response.statusText);
      const responseBody = await response.json();
      console.error("Response body:", responseBody);
    }
    
    res.locals.isSaved = await response.json();
    return next();
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
}
spotifyController.unlikeTrack = async (req, res, next) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const { track } = req.body;
    const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
      method: "DELETE",
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
    console.log("INSIDE THE unLIKE TRACK MIDDLEWARE")
    return next();
  } catch (error) {
    console.error("Error in fetch request:", error);
  }
}
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

module.exports = spotifyController;
