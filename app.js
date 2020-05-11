const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const logger = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const admins = require("./mvc/routes/admins");
const customers = require("./mvc/routes/customers");
const medicines = require("./mvc/routes/medicines");
const suppliers = require("./mvc/routes/suppliers");

const app = express();

const db = "mongodb://amit:tester1@ds133378.mlab.com:33378/medicare";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => console.log(err));

app.set("views", path.join(__dirname, "mvc", "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(passport.initialize());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use(function (req, res, next) {
  res.statusJson = function (statusCode, data) {
    let obj = {
      ...data,
      statusCode: statusCode,
    };
    res.status(statusCode).json(obj);
  };
  next();
});

app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
});

app.use("/api/admins", admins);
app.use("/api/customers", customers);
app.use("/api/medicines", medicines);
app.use("/api/suppliers", suppliers);

// HANDELING ERRORS
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  res.render("error");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
