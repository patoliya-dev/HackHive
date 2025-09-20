const express = require('express');
const router = express.Router();
const { getUsers, createEmployee } = require('../controllers/employeeController');

router.get('/', getUsers);
router.post('/uploads', createEmployee);

module.exports = router;