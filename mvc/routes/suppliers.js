const express = require("express");
const router = express.Router();

const passport = require("passport");

const supplierCtrl = require("../controllers/suppliers");

router.post(
  "/addSupplier",
  passport.authenticate("jwt", { session: false }),
  supplierCtrl.addSupplier
);

router.get(
  "/searchSupplier/:supplier",
  // passport.authenticate("jwt", { session: false }),
  supplierCtrl.searchSupplier
);

router.post(
  "/addBill",
  // passport.authenticate("jwt", { session: false }),
  supplierCtrl.addBill
);

module.exports = router;
