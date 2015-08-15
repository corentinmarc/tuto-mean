var fs = require('fs');
fs.readFile(__filename, {
  encoding: 'utf8'
}, function(error, data) {
  if (error) {
    return console.error(error.message);
  }
  console.log(data);
});
