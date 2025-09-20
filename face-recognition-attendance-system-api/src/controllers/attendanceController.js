const attendanceService = require('../services/attendanceService');

exports.getAttendanceReport = async (req, res) => {
  try {
    const AttendenceReport = await attendanceService.getAllAttendance();
    res.json(AttendenceReport);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const AttendenceReport = await attendanceService.createAttendance(req.body);
    res.json(AttendenceReport);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};