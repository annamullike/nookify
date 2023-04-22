                                                                             
const { queryAllByAltText } = require("@testing-library/react");
//import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");

const aiController = {};
const apikey = "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";
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
//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
