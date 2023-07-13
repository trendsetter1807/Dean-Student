const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  deanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dean' },
  slotDetails: {
    id: String,
    date: Date,
    time: String,
  },
  status: String, 
});

module.exports = mongoose.model('Session', sessionSchema);
