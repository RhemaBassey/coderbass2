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

// PROJECT: Buttons
app.get("/projects/buttons", (req, res) => {
  res.sendFile(__dirname + "/projects/buttons/index.html");
});

// PROJECT: Web Scraper
app.get("/projects/web_scraper", (req, res) => {
  res.render(__dirname + "/projects/web scraper/views/index.ejs", {
    title: "",
    value: "",
  });
});
app.post("/projects/web_scraper/send-url", urlEncodedParser, (req, res) => {
  let url = req.body.url;
  // res.send("SENT IT!");

  (async () => {
    const response = await got(url);

    const $ = cheerio.load(response.body);

    let title = $("h1").html();
    // let value = $('.ratingValue').find('[itemprop="ratingValue"]').html();
    let value = $('span[class="sc-7ab21ed2-1 jGRxWM"]').html();

    res.render(__dirname + "/projects/web scraper/views/index.ejs", {
      title: title,
      value: value});

  })();
});

app.listen(PORT, () => {
  console.log(`The PORT: ${PORT}, is operational`);
});
