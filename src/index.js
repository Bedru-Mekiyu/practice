const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route

//start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});