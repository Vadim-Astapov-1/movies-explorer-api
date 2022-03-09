const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');

const NotFoundError = require('../errors/not-found-error');

const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const logout = require('../middlewares/logout');
const { validateCreateUser, validateLogin } = require('../middlewares/validations');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.get('/signout', logout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(`Ресурс по адресу ${req.path} не найден`));
});

module.exports = router;
