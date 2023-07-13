const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: Date,
  time: String,
  status: String, // Available, Booked, 
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

module.exports = mongoose.model('Slot', slotSchema);
