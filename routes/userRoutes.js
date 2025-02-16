const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/create", userController.createUser);

module.exports = router;
