const express = require('express');
const authController = require('../../controllers/auth');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const router = express.Router();

router.post('/register', (req, res) => authController.register(req, res));
// router.post('/register', authController.register); // If using this, context will be lost
router.post('/login', (req, res) => authController.login(req, res));
router.post('/profile', authMiddleware.requireAuth, (req, res) => authController.profile(req, res));

module.exports = router;
