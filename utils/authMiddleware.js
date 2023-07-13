const jwt = require('./jwt');


exports.authenticateStudent = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }

  try {
    const decodedToken = jwt.verifyToken(token);
    req.user = { universityId: decodedToken.universityId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.' });
  }
};

// Authenticate Dean
exports.authenticateDean = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }

  try {
    const decodedToken = jwt.verifyToken(token);
    req.user = { universityId: decodedToken.universityId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.' });
  }
};
