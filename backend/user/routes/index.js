const express = require('express');
const ProfileRoute = require('./profile');
const BookReadRoute = require('./bookRead');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/profiles',
    route: ProfileRoute,
  },
  {
    path: '/users',
    route: BookReadRoute,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;