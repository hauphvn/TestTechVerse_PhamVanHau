const express = require('express');
const authController = require('../../controllers/auth');


const router = express.Router();

router.post('/register', (req, res) => authController.register(req, res));
// router.post('/register', authController.register); // If using this, context will be lost
router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;
