const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', authController.login);

// @route   GET /api/auth/me
// @desc    Get current user info
router.get('/me', auth, authController.me);

module.exports = router;
