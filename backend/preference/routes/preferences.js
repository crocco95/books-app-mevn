const express = require('express');
const router = express.Router();

const PreferenceController = require('../controllers/PreferenceController');

router
  .route('/:userId/preferences')
  .get(PreferenceController.list);

module.exports = router;