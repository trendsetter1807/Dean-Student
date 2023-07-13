const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const deanRoutes = require('./routes/deanRoutes');
const studentRoutes = require('./routes/studentRoutes');
const connectDb = require('./config/connectDb');

// Database connection
connectDb();

app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/dean', deanRoutes);
app.use('/api/students', studentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
