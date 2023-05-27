const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");



router.get("/callback", spotifyController.getAuthCode,(req,res)=> {
    console.log(req.query)
    res.status(200).redirect('http://localhost:3000');
  })

router.get("/toptracks", spotifyController.getTopTracks, (req, res) => {
  return res.status(200).json({data: res.locals.topTrackData})
})

router.get("/search/:query", spotifyController.refreshToken ,spotifyController.search, (req,res) => {
  return res.status(200).json({data: res.locals.searchDataName})
})
router.post("/playcurrent", spotifyController.refreshToken, spotifyController.playCurrent, (req,res) => {
  return res.status(200).send("SUCCESS")
})
router.post("/playtrack", spotifyController.refreshToken, spotifyController.playTrack, (req,res) => {
  return res.status(200).send("SUCCESS")
})
router.get("/pause",spotifyController.refreshToken, spotifyController.pauseTrack, (req, res) => {
  return res.status(200).send("success")
})
router.post("/previous",spotifyController.refreshToken, spotifyController.rewind, (req,res) => {
  return res.status(200).send("success")
})
router.post("/next",spotifyController.refreshToken, spotifyController.fastforward, (req,res) => {
  return res.status(200).send("success")
})
router.post("/like", spotifyController.refreshToken, spotifyController.likeTrack, (req,res) => {
  return res.status(200).send("success")
})
router.get("/like", spotifyController.refreshToken, spotifyController.currentTrack, (req,res) => {
  return res.status(200).send("success")
})


module.exports = router;
