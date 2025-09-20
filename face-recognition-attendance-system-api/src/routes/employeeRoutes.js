const express = require('express');
const router = express.Router();
const { getEmployee, createEmployee, deleteEmployee, updateEmployee } = require('../controllers/employeeController');

router.get('/', getEmployee);
router.post('/post', createEmployee);
router.delete('/delete', deleteEmployee);
router.put('/update', updateEmployee);

module.exports = router;