const PORT = process.env.PORT || 8080;

const gateway = require('fast-gateway');
const server = gateway({
  middlewares: [
    require('cors')()
  ],
  routes: [
    {
      prefix: '/api/v1/books',
      prefixRewrite: '/api/v1/books',
      target: 'http://books:3000'
    },
    {
      prefix: '/api/v1/books/',
      prefixRewrite: '/api/v1/books/',
      target: 'http://books:3000'
    },
    {
      prefix: '/api/v1/users',
      prefixRewrite: '/api/v1/users',
      target: 'http://preferences:3000'
    },
    {
      prefix: '/api/v1/users',
      prefixRewrite: '/api/v1/users',
      target: 'http://users:3000'
    },
    {
      prefix: '/api/v1/profiles',
      prefixRewrite: '/api/v1/profiles',
      target: 'http://users:3000'
    },
    {
      prefix: '/api/v1/profiles/',
      prefixRewrite: '/api/v1/profiles/',
      target: 'http://users:3000'
    }
  ]
});

server.start(PORT, console.log(`Gateway started on ${PORT}`));