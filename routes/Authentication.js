const express = require("express");
const router = express.Router();
const upload = require("../app/middleware/uploadImage");
const authenticationController = require("../app/controllers/AuthenticationController");

router.post(
  "/register",
  upload.single("avatar"),
  authenticationController.createUser
);
router.post(
  "/register/staff",
  upload.single("avatar"),
  authenticationController.createStaff
);
router.post("/login", authenticationController.login);
router.post("/login/staff", authenticationController.loginStaff);
router.get("/logout", authenticationController.logout);
router.get("/info/staff/:id", authenticationController.infoStaff);
router.put(
  "/edit/staff/:id",
  upload.single("avatar"),
  authenticationController.editProfileStaff
);
router.get("/info/:id", authenticationController.infoUser);
router.put(
  "/edit/:id",
  upload.single("avatar"),
  authenticationController.editProfile
);

module.exports = router;
