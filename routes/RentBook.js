const express = require("express");
const router = express.Router();
const rentController = require("../app/controllers/RentBookController");

router.get("/user/:id", rentController.listRentOfUser);
router.get("/book/:id", rentController.listRentBook);
router.get("/filter-TenSach", rentController.filterByTenDocGia);
router.get("/", rentController.listRents);
router.post("/", rentController.addToRent);
router.put("/:id", rentController.updateRent);
router.delete("/:id", rentController.deleteRent);

module.exports = router;
