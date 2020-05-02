var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//AUTH ROUTES

//show register form
router.get("/register", (req, res) => {
  res.render("register");
});

//creater new user
router.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/employees");
      });
    }
  });
});

//Show login form
router.get("/login", (req, res) => {
  res.render("login");
});

//user authentication
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/employees",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

//Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/employees");
});

module.exports = router;
