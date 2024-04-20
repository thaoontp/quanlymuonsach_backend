const express = require("express");
const router = express.Router();
const bookController = require("../app/controllers/BookController");

router.get("/", bookController.listBook);
router.post("/", bookController.addBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
