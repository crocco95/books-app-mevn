const express = require('express');
const ProfileRoute = require('./profile');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/profiles',
    route: ProfileRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;