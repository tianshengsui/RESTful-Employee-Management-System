var express = require("express");
var router = express.Router();
var Employee = require("../models/employee");
var middleware = require("../middleware/index");

//Restful Routes
router.get("/", (req, res) => {
  res.redirect("/employees");
});

//index routes
router.get("/employees", (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) {
      console.log("Error!");
    } else {
      res.render("index", { employees: employees, currentUser: req.user });
    }
  });
});

//new route
router.get("/employees/new", middleware.isLoggedIn, (req, res) => {
  res.render("new");
});

router.post("/employees", middleware.isLoggedIn, (req, res) => {
  //create employee
  Employee.create(req.body.employee, (err, newEmployee) => {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/employees");
    }
  });
});

//show route
router.get("/employees/:id", middleware.isLoggedIn, (req, res) => {
  Employee.findById(req.params.id, (err, foundEmployee) => {
    if (err) {
      res.redirect("/employees");
    } else {
      res.render("show", { employee: foundEmployee });
    }
  });
});

//edit
router.get("/employees/:id/edit", middleware.isLoggedIn, (req, res) => {
  Employee.findById(req.params.id, (err, foundEmployee) => {
    if (err) {
      res.redirect("/employees");
    } else {
      res.render("edit", { employee: foundEmployee });
    }
  });
});

//update
router.put("/employees/:id", middleware.isLoggedIn, (req, res) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    req.body.employee,
    (err, updatedEmployee) => {
      if (err) {
        res.redirect("/employees");
      } else {
        res.redirect("/employees/" + req.params.id);
      }
    }
  );
});

//delete
router.delete("/employees/:id", middleware.isLoggedIn, (req, res) => {
  //destory
  Employee.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/employees");
    } else {
      res.redirect("/employees");
    }
  });
});

module.exports = router;
