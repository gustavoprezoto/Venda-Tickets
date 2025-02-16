const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Middlewares
const { requireAuth, redirectIfAuthenticated } = require("../middlewares/authMiddleware");

// Register new user routes
router.get("/register", redirectIfAuthenticated, (req, res) => {
    res.render("register");
})
router.post("/create", redirectIfAuthenticated, userController.createUser);

// Login routes
router.get("/login", redirectIfAuthenticated, (req, res) => {
    res.render("login");
});
router.post("/login", redirectIfAuthenticated, userController.loginUser);

// Connected user routes
router.get("/dashboard", requireAuth, (req, res) => {
    res.render("dashboard", { user: req.user });
});
router.get("/logout", (req, res) => {
    res.clearCookie("user");
    res.redirect("/users/login");
});


module.exports = router;
