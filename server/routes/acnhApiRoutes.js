const express = require("express");
const router = express.Router();
const acnhController = require("../controllers/acnhController")
const aiController = require("../controllers/aiController")
//import { Configuration, OpenAIApi } from "openai";
router.get("/villiager/:villiagerid", acnhController.getVilliager, (req,res) => {
    //console.log(res.locals.villiagerData)
    //return res.status(200).json({villiager: res.locals.villiagerData})
    console.log(res.locals.villiagerData)
    return res.status(200).json({villiager: res.locals.villiagerData, catchphrase: res.locals.catchphraseData})
})

router.get("/villiager/ai/:villiagerid", acnhController.getVilliager, aiController.config,(req, res) => {
    return res.status(200).json({data: res.locals.catchData})
})

module.exports = router;