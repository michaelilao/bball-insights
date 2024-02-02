const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt || req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: true, message: 'A token is required to authenticate', status: 403 });
  }

  const tokenKey = process.env.token_key;
  try {
    const decoded = jwt.verify(token, tokenKey);
    req.token = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: true, message: 'Invalid Token', status: 401 });
  }
};

module.exports = { authenticate };
