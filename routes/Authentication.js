const express = require("express");
const router = express.Router();
const authenticationController = require("../app/controllers/AuthenticationController");

router.post("/register", authenticationController.createUser);
router.post("/register/staff", authenticationController.createStaff);
router.post("/login", authenticationController.login);
router.post("/login/staff", authenticationController.loginStaff);
router.get("/logout", authenticationController.logout);
router.get("/info/staff/:id", authenticationController.infoStaff);
router.put("/edit/staff/:id", authenticationController.editProfileStaff);
router.get("/info/:id", authenticationController.infoUser);
router.put("/edit/:id", authenticationController.editProfile);

module.exports = router;
