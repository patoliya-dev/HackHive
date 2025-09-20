const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
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
  embedding: {
    type: Array,
    default: []
  },
  photo: {
    type: String,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: {
    type: Date, 
    default: null
  },
  isDeleted: {
    type: Boolean, 
    default: false
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
