const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const Student = require('../models/Student');
const Dean = require('../models/Dean');

// Student login
exports.studentLogin = async (req, res) => {
  try {
    const { universityId, password } = req.body;
    const student = await Student.findOne({ universityId });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = jwt.generateToken({ universityId: student.universityId });
    // res.json({ token });
    res.json("Success user autheticated");
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Dean login
exports.deanLogin = async (req, res) => {
  try {
    const { universityId, password } = req.body;
    const dean = await Dean.findOne({ universityId });
    
    if (!dean) {
      return res.status(404).json({ message: 'Dean not found.' });
    }

    const passwordMatch = await bcrypt.compare(password, dean.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = jwt.generateToken({ universityId: dean.universityId });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

exports.deanRegister = async (req, res) => {
  try {
    const { universityId, password } = req.body;

    // Check if dean already exists
    const existingDean = await Dean.findOne({ universityId });
    if (existingDean) {
      return res.status(400).json({ message: 'Dean already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const dean = new Dean({ universityId, password: hashedPassword });
    await dean.save();

    const token = jwt.generateToken({ universityId: dean.universityId });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

exports.studentRegister = async (req, res) => {
  try {
    const { universityId, password } = req.body;
    
    // Check if student already exists
    const existingStudent = await Student.findOne({ universityId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ universityId, password: hashedPassword });
    await student.save();

    const token = jwt.generateToken({ universityId: student.universityId });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};
