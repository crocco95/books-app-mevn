const express = require('express');
const router = express.Router();

const SocialController = require('../controllers/SocialController');

router
  .route('/:userId/social')
    .post(SocialController.add);

router
  .route('/:userId/social')
    .get(SocialController.get);

router
  .delete('/:userId/social')
    .get(SocialController.remove);

module.exports = router;