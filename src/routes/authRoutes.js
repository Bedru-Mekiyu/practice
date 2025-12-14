const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authcontroller');

// Sample authentication route
router.post('/register',register);
router.post('/login', login);

module.exports = router;