const express = require('express');
const BookRoute = require('./books');
const ReviewRoute = require('./reviews');
const AuthMiddleware = require('./middlewares/auth');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/books',
    route: BookRoute,
  },
  {
    path: '/books',
    route: ReviewRoute,
    middleware: AuthMiddleware.extractUserIdFromTokenToBody,
  },
];

defaultRoutes.forEach((route) => {
  
  if( route.middleware ){
    router.use(route.path, route.middleware, route.route);
  }else{
    router.use(route.path, route.route);
  }
  
});

module.exports = router;