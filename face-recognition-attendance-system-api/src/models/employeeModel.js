const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String, 
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
  type: {
    type: String,
    enum: ["ADMIN", "EMPLOYEE"],
    required: true, 
  },
  photo: {
    type: String,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
