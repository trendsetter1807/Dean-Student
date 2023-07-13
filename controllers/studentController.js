const Slot = require('../models/Slot');
const Session = require('../models/Session');

// Create slots for available Dean slots
exports.createSlots = async (req, res) => {
  try {
    const thursdaySlot = new Slot({ date: getThursdayDate(), time: '10:00 AM', status: 'Available' });
    await thursdaySlot.save();
    
    const fridaySlot = new Slot({ date: getFridayDate(), time: '10:00 AM', status: 'Available' });
    await fridaySlot.save();

    res.json({ message: 'Slots created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Get available Dean slots
exports.getDeanSlots = async (req, res) => {
  try {
    // Get the current date and time
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentTime = currentDate.getHours();

    // Check if it's Thursday or Friday at 10 AM
    if (currentDay === 4 || currentDay === 5) {
      if (currentDay === 5 && currentTime >= 10) {
        return res.json({ slots: [] }); // Dean is not available on Friday after 10 AM
      }
      if (currentDay === 4 && currentTime < 10) {
        return res.json({ slots: [] }); // Dean is not available on Thursday before 10 AM
      }

      // Logic to fetch available slots
      const slots = await Slot.find({ status: 'Available' }).select('date time');
      return res.json({ slots });
    }

    return res.json({ slots: [] }); // Dean is only available on Thursday and Friday
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Book a Dean slot
exports.bookDeanSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const studentId = req.user.universityId;

    // Check if the slot is available
    const slot = await Slot.findOne({ _id: slotId, status: 'Available' });
    if (!slot) {
      return res.status(400).json({ message: 'Slot is not available.' });
    }

    // Book the slot
    slot.status = 'Booked';
    slot.student = studentId;
    await slot.save();

    // Create a session
    const session = new Session({
      student: studentId,
      deanId: slot.dean,
      slotDetails: { id: slot._id, date: slot.date, time: slot.time },
      status: 'Pending',
    });
    await session.save();

    res.json({ message: 'Slot booked successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Helper function to get next Thursday's date
function getThursdayDate() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const daysUntilThursday = currentDay <= 4 ? 4 - currentDay : 11 - currentDay;
  const nextThursday = new Date(currentDate.setDate(currentDate.getDate() + daysUntilThursday));
  nextThursday.setHours(10, 0, 0, 0); // Set time to 10 AM
  return nextThursday;
}

function getFridayDate() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const daysUntilFriday = currentDay <= 5 ? 5 - currentDay : 12 - currentDay;
  const nextFriday = new Date(currentDate.setDate(currentDate.getDate() + daysUntilFriday));
  nextFriday.setHours(10, 0, 0, 0); // Set time to 10 AM
  return nextFriday;
}

