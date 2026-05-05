const newsRouter = require("./news");
const siteRouter = require("./site");

function route(app) {
  // Define a route for the news URL ("/news")
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
}

module.exports = route;
