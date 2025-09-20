const Employee = require('../models/employeeModel');
const uploadFile = require('../utils/fileUpload');
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

exports.getEmployee = async (req, res) => {
  try {
    const localDirectory = path.join(__dirname, "..", "..", "uploads");
    const { startDate, endDate } = req.query;
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
      dateFilter['isDeleted'] = false
    }

    const employees = await Employee.find(dateFilter, {
      password: 0,
      type: 0,
      updatedAt: 0,
      isDeleted: 0,
      __v: 0
    });

    if (employees && employees.length) {
      for (let i = 0; i < employees.length; i++) {
        const element = employees[i];
        if (element.photo) {
          const fileNameParts = element.photo.split("/");
          const fileName = fileNameParts[fileNameParts.length - 1];
          const filePath = path.join(localDirectory, fileName);

          if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            element._doc.imageFile = {
              filename: fileName,
              contentType: mime.lookup(filePath) || "application/octet-stream",
              data: data.toString("base64")
            };
          }
        }
      }
    }

    const employeeCount = await Employee.countDocuments({ isDeleted : false })

    res.json({ employees, count: employeeCount });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const upload = uploadFile('./uploads', 'photo', ['image/jpeg', 'image/png']);

    upload(req, res, async (err) => {
      const { name, email, department, designation, type, embedding } = req.body
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      const employeedata = {
        name, email, department, designation, type, embedding,
        photo: `/uploads/${req.file.filename}`
      }

      const user = await Employee.create(employeedata)

      if (user && user._id) {
        res.json({
          success: true,
          message: 'Employee created successfully',
        });
      } else {
        return res.status(400).json({ success: false, message: 'Failed to crate employee' });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const upload = uploadFile('./uploads', 'photo', ['image/jpeg', 'image/png']);

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      const { employeeId } = req.query;
      const { name, department, designation, type, embedding } = req.body;

      const employeedata = {
        name,
        department,
        designation,
        type,
        embedding,
      };

      if (req.file) {
        employeedata.photo = `/uploads/${req.file.filename}`;
      }

      const employee = await Employee.findOne({
        _id: employeeId,
        isDeleted: false,
      });

      if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee does not exist' });
      }

      const result = await Employee.updateOne(
        { _id: employeeId },
        { $set: employeedata }
      );

      if (result.modifiedCount > 0) {
        return res.json({
          success: true,
          message: 'Employee updated successfully',
        });
      } else {
        return res.status(400).json({ success: false, message: 'Failed to update employee' });
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.query;

    const employees = await Employee.findOneAndDelete({
      _id: employeeId,
    });

    res.json({ success: true, message: 'Delete employee successfully' });
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};
