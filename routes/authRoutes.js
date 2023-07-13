const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/students/login', authController.studentLogin);
router.post('/dean/login', authController.deanLogin);
router.post('/dean/register', authController.deanRegister);
router.post('/students/register', authController.studentRegister);

module.exports = router;
