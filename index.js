const express = require("express");
const got = require("got");
const app = express();
const bodyParser = require("body-parser");

const cheerio = require("cheerio");

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// PROJECT: Blue Pips World
app.get("/projects/blue_pips_world", (req, res) => {
  // res.sendFile(path.join(publicPath, '/blue-pips-world/index.html')); // try to get a all projects in public folder, rather than project+public folders
  res.sendFile(__dirname + "projects/blue-pips-world/index.html")
});

// PROJECT: Buttons
app.get("/projects/buttons", (req, res) => {
  res.sendFile(__dirname + "/projects/buttons/index.html");
});

// PROJECT: Web Scraper
app.get("/projects/web-scraper", (req, res) => {
  res.render(__dirname + "/projects/web-scraper/views/index.ejs", {
    title: "",
    value: "",
    tag1: "",
    tag2: "",
    url: ""
  });
});


app.post("/projects/web_scraper/send-url", urlEncodedParser, (req, res) => {
  let url = req.body.url;
  let tag1 = req.body.tag1;
  let tag2 = req.body.tag2;


  
  // res.send("SENT IT!");

  (async () => {

    const response = await got(url);

    const $ = cheerio.load(response.body);

    let title = $(tag1).html();
    // let value = $('.ratingValue').find('[itemprop="ratingValue"]').html();
    let value = $(tag2).html();

    res.render(__dirname + "/projects/web scraper/views/index.ejs", {
      title: title,
      value: value,
      tag1: tag1,
      tag2: tag2,
      url:url
    });

  })();
});

app.listen(PORT, () => {
  console.log(`The PORT: ${PORT}, is operational`);
});
