require('dotenv').config();
const authRouter = require('./routes/authRouters');
const express = require('express');
const connectDB = require('./config');

const app = express();

// Connect to database
connectDB();

// Middleware

//Routes
app.use(express.json());
app.use('/auth', authRouter);


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;


