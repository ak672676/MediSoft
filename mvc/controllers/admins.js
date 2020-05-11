const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");
const AdminTest = (req, res) => res.json({ msg: "Users Work" });

const registerAdmin = (req, res) => {
  // console.log(req.body);
  // console.log(req.user.id);
  // res.status(500).json({ message: "Something went wrong" });
  Admin.findOne({ email: req.body.email }).then((admin) => {
    if (admin) {
      return res.status(400).json({ message: "Email already exist" });
    } else {
      const newAdmin = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        adharNo: req.body.adharNo,
        address: req.body.address,
        phone: req.body.phone,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newAdmin.password = hash;
          newAdmin
            .save()
            .then((admin) => {
              res.status(201).json({ success: true, admin });
            })
            .catch((err) =>
              res.status(500).json({ message: "Something went wrong" })
            );
        });
      });
    }
  });
};

const loginAdmin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.body);
  Admin.findOne({ email }).then((admin) => {
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: admin.id,
          firstName: admin.firstName,
          email: admin.email,
        };
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
          res.status(201).json({
            token: token,
          });
        });
      } else {
        return res.status(400).json({ message: "Password Incorrect" });
      }
    });
  });
};

// const addAdmin = (req, res) => {
//   console.log(req.body);
// };

module.exports = { AdminTest, registerAdmin, loginAdmin };
