const attendanceService = require('../services/attendanceService');

exports.getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
     // Convert strings to Date objects
     const start = new Date(startDate);
     const end = new Date(endDate);
     
      // Normalize to full day range
    start.setHours(0, 0, 0, 0);              // 2025-09-24T00:00:00
    end.setHours(23, 59, 59, 999); 
    const AttendenceReport = await attendanceService.getAllAttendance({
      date: {
        $gte: start,
        $lte: end
      }
    });
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