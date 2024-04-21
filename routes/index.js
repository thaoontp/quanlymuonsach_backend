const authentication = require("./authentication");
const published = require("./Published");
const reader = require("./Reader");
const rent = require("./RentBook");
const book = require("./Book");

function route(app) {
  app.use("/authentication", authentication);
  app.use("/published", published);
  app.use("/book", book);
  app.use("/rent", rent);
  app.use("/reader", reader);
  app.use("/", (req, res, next) => {
    res.send("HELLO");
  });
}

module.exports = route;
