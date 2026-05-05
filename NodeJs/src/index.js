const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 9000;

app.use(express.static(path.join(__dirname, "public")));

// Middleware for body
app.use(express.urlencoded());
app.use(express.json());

// HTTP logger middleware
// app.use(morgan("combined"));

// Set up Handlebars as the view engine,
// so that we can render .hbs files from the views directory
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  }),
);
// Set Handlebars as the view engine
app.set("view engine", "hbs");
// Set the directory for views
app.set("views", path.join(__dirname, "resources\\views"));

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
  res.render("home");
});

// Define a route for the news URL ("/news")
app.get("/news", (req, res) => {
  res.render("tintuc");
});

// Define a route for the search URL ("/search")
app.get("/search", (req, res) => {
  // Query parameters : ?key=value&key2=value2...
  console.log(req.query.q);
  res.render("search");
});

// Define a post route for example
app.post("/search", (req, res) => {
  console.log(req.body);
  res.send("");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
