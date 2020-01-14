const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const path = require("path");
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary");
const keys = require("./keys");
const cloudinaryStorage = require("multer-storage-cloudinary");
require("./config/passport")(passport);

// cloudinary configuration setting
cloudinary.config({
  cloud_name: keys.cloud_name,
  api_key: keys.api_key,
  api_secret: keys.api_secret
});

// cloudinary storage setting
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "profile pic",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

// routes
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");

const MONGO_URI = keys.mongoUri;
const PORT = process.env.PORT || 5000;

const app = express();

// sessions
app.use(
  session({
    secret: "keysecret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

// setting up views
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(parser.single("profileImg"));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.isAuth = req.isAuthenticated();
  next();
});

app.use(authRoutes);
app.use(indexRoutes);

// app.use("/", (req, res, next) => {
//   res.render("navbar");
// });
app.use((req, res, next) => {
  res.render("error404", { pageTitle: "Error-404" });
});

mongoose
  .connect(keys.mongoUri, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to db successfully..!");
    app.listen(PORT, () => console.log(`listening to port:${PORT}`));
  })
  .catch(err => console.log(err));
