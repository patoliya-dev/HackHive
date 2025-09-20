const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('./config/db'); // connect DB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

module.exports = app;
