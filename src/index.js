const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const dbConnect = require('./config/dbconnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// Connect to the database
dbConnect();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.use('/api/auth',authRoutes );
app.use('/api/users',userRoutes );

//start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});