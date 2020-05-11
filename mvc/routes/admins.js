const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const passport = require("passport");

const adminCtrl = require("../controllers/admins");

router.get("/test", adminCtrl.AdminTest);

router.post(
  "/registerAdmin",
  passport.authenticate("jwt", { session: false }),
  adminCtrl.registerAdmin
);

router.post("/login", adminCtrl.loginAdmin);

// router.post("/addAdmin", adminCtrl.addAdmin);

module.exports = router;
