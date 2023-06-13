import React, {useContext, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecommendations } from "../../redux/recommendationsReducer";
import SongContext from "../../redux/SongContext";
import { setPlaylist } from "../../redux/playlistReducer";

function RecommendationsButton() {
  const dispatch = useDispatch();
  const danceability = useSelector((state) => state.recQueries.danceability)
  const instrumentalness = useSelector((state) =>  state.recQueries.instrumentalness)
  const popularity = useSelector((state) =>  state.recQueries.popularity)
  const speechiness = useSelector((state) =>  state.recQueries.speechiness)
  const valence = useSelector((state)=> state.recQueries.valence)
  const genres = useSelector((state) =>state.genres.genres)
  const song = useSelector((state)=> state.song.song)
  const artist = useSelector((state) => state.song.artist)
  const recsButton = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/spotify/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({danceability: danceability, instrumentalness: instrumentalness, speechiness: speechiness, popularity: popularity, valence: valence, genres: genres, song: song, artist: artist})
        }
      );
      const data = await response.json();
      
      dispatch(
        updateRecommendations({
          recNames: data.names,
          recIds: data.ids,
          recSrc: data.src,
          recArtist: data.artist,
          recGenres: data.genres,
          recAlbum: data.album,
        })
      );
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return <button onClick={recsButton}>Get Recommendations here</button>;
}

export default RecommendationsButton;
