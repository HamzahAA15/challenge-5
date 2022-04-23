const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const port = 8080;
const logins = require("./user.json");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//main page
app.get("/", (req, res) => {
  res.render("index");
});
//login
app.get("/login", (req, res) => {
  res.render("login");
});
var loginStatus = 0;
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email != logins.username && password != logins.password) {
    res.redirect("error");
    return;
  }
  loginStatus = 1;
  console.log(logins.username, logins.password);
  console.log(email, password);
  res.redirect("/");
});

app.get("/error", (req, res) => {
  res.render("error");
});

//game page
app.get("/game", (req, res) => {
  if (loginStatus != 1) {
    res.redirect("error");
    return;
  }
  res.render("index-games");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
