const express = require("express");
const router = express.Router();
const upload = require("../app/middleware/uploadImage");
const bookController = require("../app/controllers/BookController");
router.get("/", bookController.listBook);
router.post("/", upload.single("image"), bookController.addBook);
router.put("/:id", upload.single("image"), bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
