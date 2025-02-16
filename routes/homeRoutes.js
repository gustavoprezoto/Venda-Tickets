const express = require("express");
const router = express.Router();

const { redirectIfAuthenticated } = require("../middlewares/authMiddleware");

router.get("/", redirectIfAuthenticated, (req, res) => {
  res.render("home");
});

module.exports = router;
