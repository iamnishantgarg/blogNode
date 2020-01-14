const express = require("express");
const { ensureAuthenticated } = require("../config/checkauth");

const authController = require("../controller/auth");
const router = express.Router();
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/dashboard", ensureAuthenticated, authController.getDashboard);
router.post("/login", authController.postLogin);
router.get("/logout", ensureAuthenticated, authController.getLogout);
module.exports = router;
