const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  universityId: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('Student', studentSchema);
