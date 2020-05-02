const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  email: String,
  phone: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);
