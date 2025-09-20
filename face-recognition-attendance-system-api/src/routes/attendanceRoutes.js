const express = require('express');
const router = express.Router();
const { getAttendanceReport } = require('../controllers/attendanceController');

router.get('/', getAttendanceReport);

module.exports = router;