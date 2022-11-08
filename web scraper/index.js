const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
var fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // gives our frontend access to the backend
const app = express();
const $ = cheerio.load(fs.readFileSync("index.html"));
app.use(cors());
var url = "https://www.theguardian.com/uk";

var submitted = false;

var x = 0;
function Console(event) {
  event.preventDefault();
  url = document.getElementById("data").value;

  x += 1;
  console.log(x);
  
}
console.log(x)
while (x == 0) {
  if (x == 0) {
    console.log(x);
  } else {
    console.log("stopped");
  }
}

// // else{
// // console.log(" ---- SUBMITTED ----")
// // app.get("/", (req, res) => {
// //     const articles = [];

// //     axios(url)
// //       .then((response) => {
// //         const html = response.data;

// //         // whenever we use the dollar sign we are essentially using all of this html
// //         const $ = cheerio.load(html);

// //         var count = 1;
// //         $(".fc-item__title", html).each(function () {
// //           const title = $(this).text();
// //           const url = $(this).find("a").attr("href");
// //           articles.push({ title, url, count });
// //           count += 1;
// //         });
// //         // console.log(articles)
// //         for (let i = 0; i < articles.length; i++) {
// //           const item1 = {
// //             _id: i,
// //             title: articles[i][0],
// //             url: articles[i][1],
// //           };

// //           // item1.save()
// //           // console.log(articles[i][0])

// //           // Item.find({}).sort({ _id: -1 }).exec(function(err, docs) {});
// //         }

// //         res.json(articles);
// //       })
// //       .catch((err) => console.log(err));
// //   });

// }
// // Connects to a database
// // mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true}); // local served DB
// mongoose.connect("mongodb+srv://admin-guru:Test123@cluster0.il4j8.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(err));

// //Schema
// const itemSchema = {
//     _id: String,
//     title: String,
//     url: String
// }

// // Creating a collection in a database
// const Item = mongoose.model("info", itemSchema)

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
