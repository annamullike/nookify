const express = require("express");
const app = express();
const spotifyController = require("../server/controllers/spotifyController");
const spotifyApiRoutes = require("./routes/spotifyApiRoutes");
const acnhApiRoute = require("./routes/acnhApiRoutes")
const aiRoutes = require("./routes/aiRoutes")
const secretsRoute = require("./routes/secretsRoute")
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use("/api/spotify/", spotifyApiRoutes);
app.use("/api/acnh/", acnhApiRoute)
app.use("/api/ai/", aiRoutes)
app.use("/api/secrets", secretsRoute)

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = {
    ...defaultErr,
    log: err.log,
    message: err.message,
  };
  console.log(errorObj.log);

  res.status(errorObj.status).json(errorObj.message);
});

app.listen(5000, () => console.log("Server listening on port 5000"));


// create a judgmental music phrase using a catchphrase from an Animal Crossing villager