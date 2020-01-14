const express = require("express");
const { ensureAuthenticated } = require("../config/checkauth");
const indexController = require("../controller/index");
const router = express.Router();
router.get("/", ensureAuthenticated, indexController.getIndex);
router.get("/add-post", ensureAuthenticated, indexController.getAddPost);
router.post("/add-post", indexController.postAddPost);
router.post("/delete-post", indexController.postDeletePost);
router.post("/post-comment", indexController.postPostComment);

module.exports = router;
