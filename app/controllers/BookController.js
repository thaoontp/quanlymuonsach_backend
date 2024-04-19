const Book = require("../models/BookModel");
const multer = require("multer");
// const storage = require("../../services/uploadImage");

class BookController {
  index(req, res, next) {
    res.send("HELLO WORD");
  }
}

module.exports = new BookController();
