const express = require('express');
const router = express.Router();

const PreferenceController = require('../controllers/PreferenceController');

router
  .route('/:userId/preferences')
  .get(PreferenceController.list);

router
  .route('/:userId/preferences/:category')
  .get(PreferenceController.get);

module.exports = router;