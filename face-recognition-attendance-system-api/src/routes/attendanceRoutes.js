const express = require('express');
const router = express.Router();
const { getAttendanceReport, createAttendance } = require('../controllers/attendanceController');

router.get('/', getAttendanceReport);
router.post('/', createAttendance);

module.exports = router;