import express from "express";
import got from "got";
import bodyParser from "body-parser";
import cheerio from "cheerio";
import * as url from "url";
import path from "path"

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

// const publicPath = path.join(__dirname, '..');
const publicProject = path.join(__dirname,"..","public/projects");

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");

// used '/public' as a prefix, so I can distinguish between multiple public files. 
// NOTE: without this prefix I can have multiple public files, as other public files will be ignored and only one public file would be used as the default
// NOTE: Put the prefix in the HTML links so that it will use the correct public folder... or file
app.use('/public', express.static(path.join(__dirname,'..','public')));

// // used '/build' as a prefix, so I can distinguish between multiple public files
// app.use('/forex-site/build',express.static(publicPath));
// app.use( express.static(publicPath));

// app.use(express.static(__dirname));

// app.use(express.static(path.join(__dirname, '..', 'public/projects/app2/build')));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});



// PROJECT: Blue Pips World
app.get("/projects/app2", (req, res) => {
  res.sendFile(path.join(publicProject,"app2/build/index.html"));
});

// PROJECT: Buttons
app.get("/projects/buttons", (req, res) => {
  res.sendFile(path.join(__dirname,'..',"public/projects/buttons/index.html"));
});

// PROJECT: Web Scraper
app.get("/projects/web-scraper", (req, res) => {
  res.render("../public/projects/web-scraper/views/index.ejs", {
    title: "",
    value: "",
    tag1: "",
    tag2: "",
    url: "",
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

    res.render("../public/projects/web-scraper/views/index.ejs", {
      title: title,
      value: value,
      tag1: tag1,
      tag2: tag2,
      url: url,
    });
  })();
});

app.listen(PORT, () => {
  console.log(`The PORT: ${PORT}, is operational`);
});
