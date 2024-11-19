const { log } = require("console");
require("dotenv").config();
const session = require("express-session");
const express = require("express");
const app = express();
const ejs = require("ejs");
const router = express.Router();
const mongoose = require("mongoose");
// const multer=require('multer');
const path = require("path");
const nocache = require("nocache");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const passport = require("passport");
const swal = require("sweetalert");

mongoose.connect("mongodb://localhost:27017/project1");

const port = 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("public/uploads", express.static("uploads"));

const adminroute = require("./routes/adminrouter");
const userroute = require("./routes/userrouter");

app.use(nocache());
app.use((req, res, next) => {
  res.setHeader("cache-control", "no-store");
  res.setHeader("pragma", "no-cache");
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/admin", adminroute);
app.use("/", userroute);

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
