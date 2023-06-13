require("dotenv").config({ path: "config.env" });

const clientId = process.env.CLIENT_ID;

secretsController = {  };
secretsController.getClient = (req, res, next) => {
    res.locals.clientIdData = clientId;
    console.log("CLIENT ID HERE",clientId)
    return next()
}
module.exports = secretsController;