const express = require('express');
const router = express.Router();
const AuthMiddleware = require('./middleware/auth');

const ProfileController = require('../controllers/ProfileController');

router
  .route('/')
    .post(ProfileController.create);

router
  .route('/:userId')
    .get(ProfileController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenToBody)
    .route('/:userId')
      .put(ProfileController.edit);

module.exports = router;