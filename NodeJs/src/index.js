const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// HTTP logger middleware
app.use(morgan("combined"));

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

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
