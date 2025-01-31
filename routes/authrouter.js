const express = require('express');

const router = express.Router();

const { login, register, forgetPassword, resetPassword } = require('../controlles/authcontroller');

router.post('/login', login);
router.post('/register', register)
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);


module.exports = router;