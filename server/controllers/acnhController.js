const fetch = require("node-fetch");
const acnhController = {};

acnhController.getVilliager = async (req, res, next) => {
  const {villiagerid} = req.params;
  try {
    fetch(`http://acnhapi.com/v1/villagers/${villiagerid}/`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        res.locals.villiagerData = data.name["name-USen"];
        res.locals.catchphraseData = data.saying;
        return next();
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = acnhController;