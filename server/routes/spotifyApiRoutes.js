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
router.post("/playtrack", spotifyController.refreshToken, spotifyController.playTrack, (req,res) => {
  console.log("made it to the end of it hehe")
  return res.status(200).send("SUCCESS")
})



module.exports = router;
