const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/slots', authMiddleware.authenticateStudent, studentController.getDeanSlots);
router.post('/slots/:slotId/book', authMiddleware.authenticateStudent, studentController.bookDeanSlot);
router.post('/slots/create', authMiddleware.authenticateStudent, studentController.createSlots);

module.exports = router;

