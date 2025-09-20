const attendanceService = require('../services/attendanceService');

exports.getAttendanceReport = async (req, res) => {
  try {
    const AttendenceReport = await attendanceService.getAllAttendance();
    return res.status(400).json({ data: AttendenceReport,  success: false, message: 'Report get successfully' });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const AttendenceReport = await attendanceService.createAttendance(req.body);
    return res.status(400).json({data: AttendenceReport, success: false, message: 'Report get successfully' });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};