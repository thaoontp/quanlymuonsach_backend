const BookRoute = require("../app/controllers/BookController");

function route(app) {
  app.use("/", BookRoute.index);
}

module.exports = route;
