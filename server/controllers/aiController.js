                                                                             
const { queryAllByAltText } = require("@testing-library/react");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config({ path: "config.env" });
const aiController = {};
const apikey = process.env.API_KEY;
aiController.config = async (req, res, next) => {
  const catchphrase = res.locals.catchphraseData;

  const configuration = new Configuration({
    apiKey: apikey,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `from this animal crossing catchphrase ${catchphrase}, can you reword it so it turns it into a judgemental phrase as if you were responding to someones music tastes? Make sure to add something along the lines of your music is... in it`,
    temperature: .1,
    max_tokens: 100,
  });
  res.locals.catchData = completion.data.choices[0].text;
  return next();
};
module.exports = aiController;
