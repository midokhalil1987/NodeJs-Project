const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article");

app.use(express.json());

mongoose
  // link from mongodb
  .connect("")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Could not connect to MongoDB", e);
  });

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/hi", (req, res) => {
  res.send("You visited hi");
});

app.post("/addComment", (req, res) => {
  res.send("this is first comment");
});

app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 1; i <= 100; i++) {
    numbers += i + " - ";
  }
  // res.sendFile(__dirname + "/views/numbers.html");
  res.render("numbers.ejs");
});

app.post("/articles", async (req, res) => {
  const newArticle = new Article();
  const artTitle = req.body.articleTitle; // from database
  const artBody = req.body.articleBody; // from database

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 100;
  await newArticle.save();

  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findById(id);
    res.json(article);
    return;
  } catch (e) {
    console.log("error while reading article of id", id);
    return res.json(e);
  }
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const deleteArticle = await Article.findByIdAndDelete(id);
    res.json(deleteArticle);
    return;
  } catch (e) {
    console.log("error while deleting article of id");
    return res.json(e);
  }
});

app.listen(3000, () => {
  console.log("I am listing in port 3000");
});
