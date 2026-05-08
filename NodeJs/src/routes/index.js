const newsRouter = require("./news");
const meRouter = require("./me");
const siteRouter = require("./site");
const postsRouter = require("./posts");
const coursesRouter = require("./courses");

function route(app) {
    // Define a route for the news URL ("/news")
    app.use("/courses", coursesRouter);
    app.use("/news", newsRouter);
    app.use("/me", meRouter);
    app.use("/posts", postsRouter);
    app.use("/", siteRouter);
}

module.exports = route;
