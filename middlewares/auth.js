const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const authCookies = req.cookies.authorization;

  if (!authCookies || !authCookies.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  const token = authCookies.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'user-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
