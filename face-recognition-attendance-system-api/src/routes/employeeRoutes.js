const express = require('express');
const router = express.Router();
const { getEmployee, createEmployee } = require('../controllers/employeeController');

router.get('/', getEmployee);
router.post('/post', createEmployee);

module.exports = router;