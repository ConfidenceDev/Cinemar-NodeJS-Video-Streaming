const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/media", (req, res) => {
  const range = req.headers.range;
  if (!range) res.status(400).send("Requires Range header");

  const vidPath = "laugh.mp4";
  const vidSize = fs.statSync(vidPath).size;

  const chunk = Math.pow(10, 5); // -> 100KB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunk, vidSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${vidSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const stream = fs.createReadStream(vidPath, { start, end });
  stream.pipe(res);
});

app.listen(5000, () => {
  console.log("Server running on port: 5000");
});
