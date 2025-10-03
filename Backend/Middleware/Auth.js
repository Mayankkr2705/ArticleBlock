const jwt = require('jsonwebtoken');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token provided or malformed header');
    return res.status(401).json({ 
      message: 'Unauthorized: No token provided or malformed header' 
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub };
    // Check if token is about to expire (within 5 minutes)
    const now = Math.floor(Date.now() / 1000);
    const timeToExpiry = payload.exp - now;
    
    if (timeToExpiry < 300) { // Less than 5 minutes
      console.log('Token expiring soon, consider refreshing');
    }
    
    req.user = { id: payload.sub };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token has expired',
        expired: true 
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token format' 
      });
    } else {
      console.log(error);
      return res.status(401).json({ 
        message: 'Token verification failed' 
      });
    }
  }
}

module.exports = { requireAuth };
