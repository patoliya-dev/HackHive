const attendanceService = require("../services/attendanceService");
const Attendance = require('../models/attendanceModel');
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

exports.getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // Convert strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Normalize to full day range
    start.setHours(0, 0, 0, 0); // 2025-09-24T00:00:00
    end.setHours(23, 59, 59, 999);
    const AttendenceReport = await attendanceService.getAllAttendance({
      date: {
        $gte: start,
        $lte: end,
      },
    });
    const localDirectory = path.join(__dirname, "..", "..", "uploads");
    if(AttendenceReport && AttendenceReport.length) {
      for (let index = 0; index < AttendenceReport.length; index++) {
        const element = AttendenceReport[index];
        if (element && element.employeeId && element.employeeId.photo) {
          const fileNameParts = element.employeeId.photo.split("/");
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
    return res.json({
      data: AttendenceReport,
      success: true,
      message: "Report get successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const AttendenceReport = await attendanceService.createAttendance(req.body);
    return res.json({
      data: AttendenceReport,
      success: true,
      message: "Report get successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.employeeCount =  async (req, res) => {
  try {
    // Today
    const dailyAttendance = await Attendance.countDocuments({
      created: {
        $gte: new Date(new Date().setHours(0,0,0,0)),  
        $lt: new Date(new Date().setHours(23,59,59,999))
      }
    })

    // This Week (Sunday–Saturday default)
    const weeklyAttendance = await Attendance.countDocuments({
      created: {
        $gte: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
        $lt: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7))
      }
    })

    const totalAttendance = await Attendance.countDocuments()

    res.json({
      dailyAttendance,
      weeklyAttendance,
      totalAttendance
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
