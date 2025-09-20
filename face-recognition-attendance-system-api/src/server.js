const express = require('express');
const app = express();
require('./config/db');

// Middleware
app.use(express.json());

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');

// Mount routes
app.use('/api/employees', employeeRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});