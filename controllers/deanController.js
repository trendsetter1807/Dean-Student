const Session = require('../models/Session');

// Get all pending sessions for Dean
exports.getPendingSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ deanId: req.user.universityId, status: 'Pending' })
      .populate('student', 'name')
      .select('student slotDetails');

    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

