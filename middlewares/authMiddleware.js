const requireAuth = (req, res, next) => {
    const userCookie = req.cookies.user;

    if (!userCookie) {
        return res.redirect("/users/login");
    }

    req.user = JSON.parse(userCookie);
    next();
};

const redirectIfAuthenticated = (req, res, next) => {
    const userCookie = req.cookies.user;

    if (userCookie) {
        return res.redirect("/users/dashboard");
    }

    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.user || !req.user.is_admin) {
      return res.status(403).render("dashboard", { user: req.user, error: "Only admins can perform this action!" });
    }
    next();
  };

module.exports = { requireAuth, redirectIfAuthenticated, requireAdmin };
