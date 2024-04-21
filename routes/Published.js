const express = require("express");
const router = express.Router();
const publishedController = require("../app/controllers/PublisherController");

router.get("/", publishedController.listPublisher);
router.post("/", publishedController.addPublisher);
router.put("/:id", publishedController.updateProduct);
router.delete("/:id", publishedController.deleteProduct);

module.exports = router;
