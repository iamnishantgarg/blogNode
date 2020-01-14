const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
// const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const passport = require("passport");

exports.getLogin = (req, res, next) => {
  res.render("login", { pageTitle: "Login" });
};
exports.getSignup = (req, res, next) => {
  res.render("signup", { pageTitle: "Signup" });
};

exports.postSignup = (req, res, next) => {
  const { name, email, password1, password2 } = req.body;
  const profilePic = req.file;
  console.log(profilePic);
  let errors = [];
  if (!name || !email || !password1 || !password2) {
    req.flash("error_msg", "plz fillout all fields");
    return res.redirect("/signup");
  }
  if (password1.length < 6 || password2.length < 6) {
    req.flash("error_msg", "password must be greater than 6 chars");
    return res.redirect("/signup");
  }
  if (password1.toString() != password2.toString()) {
    req.flash("error_msg", "password fields did not match");
    return res.redirect("/signup");
  }
  User.findOne({ email: email }).then(user => {
    if (user) {
      req.flash("error_msg", "email already registered...!");
      return res.redirect("/signup");
    } else {
      var password = password1;

      const newUser = new User({ name, email, password });
      if (profilePic) newUser.profilePic = profilePic.url;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(result => {
              req.flash("success_msg", "registered successfully");
              res.redirect("/login");
            })
            .catch(err => {
              console.log(err);
              req.flash("error_msg", "unexpected error:plz register again");
              res.redirect("/signup");
            });
        });
      });
    }
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
};
exports.getDashboard = (req, res, next) => {
  var posts = [];
  Post.find({ userId: req.user._id })
    .then(docs => {
      res.render("dashboard", {
        user: req.user,
        posts: docs,
        pageTitle: "Dashboard"
      });
    })
    .catch(err => console.log(err));
};
exports.getLogout = (req, res, next) => {
  req.logOut();
  req.flash("success_msg", "successfully logged out");
  res.redirect("/login");
};
