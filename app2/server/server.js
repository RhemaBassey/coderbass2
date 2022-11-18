// const path = require('path');
const express = require("express");
const app = express();
// const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 9000;
app.use(express.static("public"));

// const url = require("url");

// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.get("*", (req, res) => {
  //    res.sendFile(path.join(publicPath, 'index.html'));
  res.sendFile("C:/Users/USER/Desktop/Programming Related/Web Dev/coderbass website/current site/app2/public/index.html");
});
app.listen(port, () => {
  console.log("Server is up!");
});
