const express = require('express');
const PreferenceRoute = require('./preferences');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: PreferenceRoute,
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