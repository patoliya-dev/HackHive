const mongoose = require('mongoose');
const { Schema } = mongoose

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "workspace",
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  }
},{
  collection: "Attendance",
  timestamps: {
    createdAt: "created",
    updatedAt: "modified",
  },
});

module.exports = mongoose.model('Attendance', EmployeeSchema);
