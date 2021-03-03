const express = require('express');
const router = express.Router();
const AuthMiddleware = require('./middleware/auth');
const SocialController = require('../controllers/SocialController');

router
  .route('/:userId/social')
    .post(SocialController.add);

router
  .route('/:userId/social')
    .get(SocialController.list);

router
  .route('/:userId/social/:followingUserId')
    .get(SocialController.get);

router
  .use(AuthMiddleware.extractUserIdFromTokenToBody)
    .route('/:userId/social/:followingUserId')
      .delete(SocialController.remove);

module.exports = router;