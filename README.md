# Nookify
This is a Spotify integrated application to give you a fine-tune list of recommendations based on your preferences! This includes getting a list of recommendations based on the danceabilitiy, popularity, instrumentalness, positivity and speechiness of a song. In addition to that, you are able to stream your music right through the application. All you need to get started is a Spotify Premium account.

This application was made with Vite, JavaScript React.js, Redux.js, Express.js, the [Spotify API](https://developer.spotify.com/), [Spotify Web Api](https://github.com/thelinmichael/spotify-web-api-node) and the [Animal Crossing API](http://acnhapi.com/).
## Preview
There will be a sidebar to give you 12 songs based on your preferences. If no preferences are specified, your recommendations will be based off your top 5 genres, 2 randomized tracks and 2 randomized artists from your top songs and artists.

The genres listed are specific to genres based on your data and aligns with your music taste. Once the list of tracks are shown, you are able to add all the songs that were generated into a playlist. The playlist name will be a randomized Animal Crossing Villiager name.

Songs can be like individually, and played individually from the recommended or from the search bar on the right. To start streaming your music through the application, you must first choose a song to hit play on, then click "Listen here!" to transfer streaming devices. 

![image](https://github.com/annamullike/nookify/assets/111384304/948d7dd5-01dc-4c39-8256-b412c6b46343)

## Getting Started
1. Head over to the [Spotify Dashboard](https://developer.spotify.com/dashboard) and create an account.
2. Click Create app with the following information
    - **Required**, App name: Nookify
    - **Required**, App Description: Animal Crossing Theme Spotify Integrated Application
    - Optional, Website: 
    - **Required**, Redirect URI: http://localhost:5000/api/spotify/callback
3. Click agreements, and then save
4. Click settings to see your client id and your client secret. Keep these handy!
5. Create a "config.env" file in the root directory
6. In the config.env file, paste in credentials where it says CLIENT ID HERE and CLIENT SECRET HERE without the brackets
    - CLIENT_ID = "[CLIENT ID HERE]"
    - CLIENT_SECRET = "[CLIENT SECRET HERE]"
7. In your terminal, run "npm i" and then "npm start"
8. Locate to http://localhost:3000
9. Login with Spotify and Enjoy!


Anna Tran [@LinkedIn](http://linkedin.com/in/annatran10)




