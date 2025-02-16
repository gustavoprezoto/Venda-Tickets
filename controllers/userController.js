const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.render("register", { error: "Email already registered!" });
        }

        const newUser = await User.create({ name, email, password });

        res.cookie("user", JSON.stringify(newUser), { httpOnly: true, maxAge: 3600000 }); //1 hour

        return res.redirect("/users/dashboard");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.render("register", { error: "Internal server error" });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.render("login", { error: "Invalid email or password!" });
        }

        res.cookie("user", JSON.stringify(user), { httpOnly: true, maxAge: 3600000 }); // 1 hour

        return res.redirect("/users/dashboard");
    } catch (error) {
        console.error("Error during login:", error);
        return res.render("login", { error: "Internal server error" });
    }
};