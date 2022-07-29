const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const Streamer = require("./stream");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/media", (req, res) => {
  const str = new Streamer("laugh.mp4", 5, req);
  str.start();
  //str.stop();
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
