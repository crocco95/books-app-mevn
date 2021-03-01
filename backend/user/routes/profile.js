const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/ProfileController');

router
  .route('/')
    .post(ProfileController.create);

router
  .route('/:userId')
    .get(ProfileController.get);

module.exports = router;