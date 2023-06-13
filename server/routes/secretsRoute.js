const express = require("express");
const router = express.Router();
const secretsController = require("../controllers/secretsController");

router.get("/getclient", secretsController.getClient, (req, res) => {
    return res.status(200).json({clientId: res.locals.clientIdData})
})

module.exports = router;