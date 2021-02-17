const express = require('express');
const ProfileRoute = require('./profile');
const BookReadRoute = require('./bookRead');
const AuthMiddleware = require('./middleware/auth');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/profiles',
    route: ProfileRoute,
  },
  {
    path: '/users',
    route: BookReadRoute,
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