const express = require('express');
const BookRoute = require('./books');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/books',
    route: BookRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;