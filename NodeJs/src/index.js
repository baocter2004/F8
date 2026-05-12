const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
// Override Method (GET POST PUT PATCH DELETE)
const methodOverride = require("method-override");
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

// Middleware for override method - read at https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride("_method"));

// Example middleware
// Chính function là middleware
app.get(
    "/middleware",
    function (req, res, next) {
        if (["vethuong", "vevip"].includes(req.query.ve)) {
            req.face = "gạch gạch gạch!!!!";
            return next();
        }

        res.status(403).json({
            message: "Access Denied!",
        });
    },
    function (req, res, next) {
        res.json({
            message: "successfully!",
            face: req.face,
        });
    },
);

// HTTP logger middleware
// app.use(morgan("combined"));

// Set up Handlebars as the view engine,
// so that we can render .hbs files from the views directory
// Custom helpers for buildin helper
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
        },
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
