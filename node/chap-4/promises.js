var fs = require('fs');

var promise = new Promise(function(resolve, reject) {
  fs.readFile('README.txt', 'utf8', function(error, data) {
    if (error) {
      return reject(error);
    }
    resolve(data);
  });
});

promise.then(function(result) {
  console.log(result);
}).catch(function(error) {
  console.error(error.message);
}).then(function() {
  console.log('THE END!');
});
