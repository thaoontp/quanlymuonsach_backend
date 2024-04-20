const authentication = require("./authentication");
const published = require("./Published");
const customer = require("./Reader");
const rent = require("./RentBook");
const book = require("./Book");

function route(app) {
  app.use("/", (req, res, next) => {
    res.send("HELLO");
  });
  app.use("/authentication", authentication);
  app.use("/published", published);
  app.use("/book", book);
  app.use("/rent", rent);
  app.use("/reader", customer);
}

module.exports = route;
