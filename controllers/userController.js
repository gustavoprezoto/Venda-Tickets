const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render("register", { error: "Email already registered!" });
    }

    await User.create({ name, email, password });

    return res.render("register", { message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.render("register", { error: "Internal server error" });
  }
};
