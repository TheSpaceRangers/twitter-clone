const express = require('express');

const authController = require('../controllers/auth-controller');

const router = express.Router();

router.post('/choose-pseudo', authController.choosePseudo);
router.post('/verify-token', authController.verifyToken);

module.exports = router;
