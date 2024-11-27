const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookRoutes = require("./routes/bookingRoutes")

const app = express();

connectDB();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', roomRoutes);
app.use('/api/v1',bookRoutes)

module.exports = app;
