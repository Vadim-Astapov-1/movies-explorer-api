const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const getUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return next(new NotFoundError('Пользователь с указанным _id не найден'));
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return next(new NotFoundError('Пользователь с указанным _id не найден'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Такой email уже занят'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Такой email уже существует'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUser(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'user-secret-key', { expiresIn: '7d' });
        return res
          .cookie('authorization', `Bearer ${token}`, {
            maxAge: 3600000 * 24 * 7,
            secure: true,
            httpOnly: true,
            sameSite: true,
          })
          .status(200).send({
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
            },
          });
      }
      return next(new UnauthorizedError('Неправильные почта или пароль'));
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateProfile,
  createUser,
  login,
};
