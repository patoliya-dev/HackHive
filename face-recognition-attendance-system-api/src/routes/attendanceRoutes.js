const express = require('express');
const router = express.Router();
const { getAttendanceReport, createAttendance, employeeCount } = require('../controllers/attendanceController');

router.get('/', getAttendanceReport);
router.post('/', createAttendance);
router.get('/employee-count', employeeCount);

module.exports = router;