const express = require("express");
const router = express.Router();
const ReaderController = require("../app/controllers/ReaderController");

router.get("/", ReaderController.listUser);
router.get("/admin", ReaderController.listStaff);
router.get("/dashboard", ReaderController.dashBoard);

module.exports = router;
