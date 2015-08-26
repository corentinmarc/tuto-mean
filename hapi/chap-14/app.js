var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({host: 'localhost', port: 3000});

server.route({
  method: 'GET',
  path: '/users',
  config: {
    cache: { expiresIn: 1 }
  },
  handler: function (request, reply) {
      var result = {};
      setTimeout(function () {
        result.users = [{
          first: 'Abraham',
          last: 'Lincoln'
        }, {
          first: 'Andrew',
          last: 'Johnson'
        }, {
          first: 'Ulysses',
          last: 'Grant'
        }];
        result.time = Date.now();
        reply(result).header('X-Special-Header', 'MEAN Stack');
      }, 3000);
  }
});
server.start(function () {
  console.log('Server running at: ', server.info.uri);
});