const jwt = require('jsonwebtoken');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided or malformed header' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: payload.sub };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
module.exports = { requireAuth };