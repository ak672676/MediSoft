const express = require("express");
const router = express.Router();

const passport = require("passport");

const medicineCtrl = require("../controllers/medicines");

router.post(
  "/addMedicine",
  // passport.authenticate("jwt", { session: false }),
  medicineCtrl.addMedicine
);

router.get("/searchCompany/:company", medicineCtrl.searchCompany);
router.get("/searchMedicine/:medicine", medicineCtrl.searchMedicine);

module.exports = router;
