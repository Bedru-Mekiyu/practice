const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authmiddleware');
const authorizeRoles = require('../middlewares/rolemiddleware');    




//only admin can access this route
router.get('/admin',verifyToken,authorizeRoles('admin'), (req, res) => {
    res.send(' wellcome Admin Access Granted');
});


//only manager can access this route
router.get('/manager',verifyToken,authorizeRoles('admin','manager'), (req, res) => {
    res.send(' wellcome Manager Access Granted');
});

//only user can access this route
router.get('/user',verifyToken,authorizeRoles('admin','manager','user'), (req, res) => {
    res.send(' wellcome User Access Granted');
});

module.exports = router;