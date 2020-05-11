const express = require("express");
const router = express.Router();

const passport = require("passport");

const customerCtrl = require("../controllers/customers");

router.post(
  "/addCustomer",
  passport.authenticate("jwt", { session: false }),
  customerCtrl.addCustomer
);

router.get(
  "/getCustomer/:customerName",
  // passport.authenticate("jwt", { session: false }),
  customerCtrl.getCustomerByName
);

// router.post(
//   "/registerAdmin",
//   passport.authenticate("jwt", { session: false }),
//   adminCtrl.registerAdmin
// );

// router.post("/login", adminCtrl.loginAdmin);

// router.post("/addAdmin", adminCtrl.addAdmin);

module.exports = router;
