const express = require('express');
const deanController = require('../controllers/deanController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/sessions/pending', authMiddleware.authenticateDean, deanController.getPendingSessions);

module.exports = router;
