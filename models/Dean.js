const mongoose = require('mongoose');

const deanSchema = new mongoose.Schema({
  universityId: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('Dean', deanSchema);
