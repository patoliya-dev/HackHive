const Employee = require('../models/employeeModel');
const uploadFile = require('../utils/fileUpload');

exports.getUsers = async (req, res) => {
  try {
    console.log("==========+>");
    const users = await Employee.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const upload = uploadFile('./uploads', 'photo', ['image/jpeg', 'image/png']);

    upload(req, res, async (err) => {
      const { employeeId, name, email, department, designation,   } = req.body
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
      
      const employeedata = {
        employeeId, name, email, department, designation,
        type: "EMPLOYEE",
        photo: `/uploads/${req.file.filename}`
      }

      const user = await Employee.create(employeedata)

      if(user && user._id) {
        res.json({
          success: true,
          message: 'File uploaded successfully',
          filename: req.file.filename,
          path: `/uploads/${req.file.filename}`
        });
      } else {
        return res.status(400).json({ success: false, message: 'Failed to crate employee' });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
};
