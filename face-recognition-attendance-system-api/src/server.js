const express = require('express');
const app = express();
require('./config/db');
const cors = require('cors');
app.use(cors());
// Middleware
app.use(express.json());

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// Mount routes
app.use('/api/employees', employeeRoutes);
app.use('/api/attendances', attendanceRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});