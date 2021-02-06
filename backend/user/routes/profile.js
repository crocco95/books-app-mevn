const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/ProfileController');

// router
//   .route('/')
//   .get(ProfileController.list);

router
  .route('/')
    .post(ProfileController.create);

module.exports = router;