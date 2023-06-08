const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");



router.get("/callback", spotifyController.getAuthCode,(req,res)=> {
    res.status(200).redirect('http://localhost:3000');
  })

router.get("/toptracks", spotifyController.getTopTracks, (req, res) => {
  return res.status(200).json({data: res.locals.topTrackData,name: res.locals.topName, src: res.locals.topImgSrc, id: res.locals.seedTracks, artist: res.locals.artistNamesData})
})
router.get("/topartists", spotifyController.getTopArtists, (req, res) => {
  return res.status(200).json({data: res.locals.topArtistsData})
})

router.get("/search/:query", spotifyController.refreshToken ,spotifyController.search, (req,res) => {
  return res.status(200).json({data: res.locals.searchDataName})
})
router.get("/searchartist/:query", spotifyController.refreshToken ,spotifyController.searchArtist, (req,res) => {
  return res.status(200).json({data: res.locals.searchDataName})
})
router.post("/playcurrent", spotifyController.refreshToken, spotifyController.playCurrent, (req,res) => {
  return res.status(200).send("SUCCESS")
})
router.post("/playtrack", spotifyController.refreshToken,spotifyController.getDevice, spotifyController.playTrack, (req,res) => {
  return res.status(200).send("SUCCESS")
})
router.get("/pause",spotifyController.refreshToken, spotifyController.getDevice, spotifyController.pauseTrack, (req, res) => {
  return res.status(200).send("success")
})
router.post("/previous",spotifyController.refreshToken, spotifyController.rewind, (req,res) => {
  return res.status(200).send("success")
})
router.post("/next",spotifyController.refreshToken, spotifyController.fastforward, (req,res) => {
  return res.status(200).send("success")
})
router.post("/like", spotifyController.refreshToken, spotifyController.likeTrack, (req,res) => {
  //console.log("end of middleware in like")
  return res.status(200).send("success")
})
router.get("/getgenre", spotifyController.refreshToken, spotifyController.getTopArtists, (req,res) => {
  return res.status(200).json(res.locals.top10Genres)
})
router.get("/current", spotifyController.refreshToken, spotifyController.currentTrack, (req,res) => {
  return res.status(200).json({current: res.locals.currTrack})
})
router.get("/accesstoken", spotifyController.refreshToken, (req,res) => {
  return res.status(200).json({"token": res.locals.accessToken})
})
router.get("/getdevice", spotifyController.refreshToken, spotifyController.getDevice, (req,res) => {
  return res.status(200).json({"deviceID": res.locals.nookifyDeviceId})
})
router.get("/transfer", spotifyController.refreshToken, spotifyController.getDevice, spotifyController.transferPlayback, (req, res) => {
  return res.status(200)
})
// router.get("/recommendations", spotifyController.refreshToken, spotifyController.getTopArtists, spotifyController.getTopTracks, spotifyController.recommendations, (req, res) => {
//   return res.status(200).json({src: res.locals.imgSrc ,names: res.locals.trackTitleData, ids: res.locals.titleIdData, artists: res.locals.artistNamesData})
// })
router.post("/recommendations", spotifyController.refreshToken, spotifyController.getTopArtists, spotifyController.getTopTracks, spotifyController.recommendations, (req, res) => {
  return res.status(200).json({src: res.locals.imgSrc ,names: res.locals.trackTitleData, ids: res.locals.titleIdData, artist: res.locals.artistNamesData, genres: res.locals.top10Genres})
})
module.exports = router;
