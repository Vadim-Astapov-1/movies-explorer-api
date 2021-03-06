const router = require('express').Router();

const {
  getUser,
  updateProfile,
} = require('../controllers/users');

const { validateUpdateProfile } = require('../middlewares/validations');

router.get('/me', getUser);
router.patch('/me', validateUpdateProfile, updateProfile);

module.exports = router;
