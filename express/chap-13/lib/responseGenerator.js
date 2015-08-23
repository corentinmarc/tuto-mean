var fs = require('fs');

exports.send404 = function (response) {
  console.error('Ressource not found');

  response.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  response.end('Not found');
};

exports.sendJson = function (data, response) {
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  response.end(JSON.stringify(data));
};

exports.send500 = function (data, response) {
  console.error(data.red);
  
  response.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  response.end(data);
};

exports.staticFile = function (staticPath) {
  return function(data, response) {
    var readStream;

    // Fix so routes to /home and home.html both work.
    data = data.replace(/^(\/home)(.html)?$/i, '$1.html');
    data = '.' + staticPath + data;
    console.log(data);

    fs.stat(data, function(error, stats) {
      if(error || stats.isDirectory()) {
        return exports.send404(response);
      }
      console.log(stats);
      readStream = fs.createReadStream(data);
        console.log(readStream);
        return readStream.pipe(response);
    });
  }
};
