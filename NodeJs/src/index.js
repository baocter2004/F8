const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 9000;

// Require Route routes/index.js
const route = require("./routes");

// Import config/db
const db = require("./config/db");

// Connect to DB
db.connect();

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

// Route init
route(app);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
