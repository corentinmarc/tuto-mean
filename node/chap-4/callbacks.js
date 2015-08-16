var fs = require('fs');
var fileName = 'README.txt';

function readCallback(error, data) {
  if (error) {
    return console.error(error);
  }
  console.log(data);
}

function statCallback(error, stats) {
  if (error) {
    return console.error(error);
  } else if (!stats.isFile()) {
    return console.error('Not a file');
  }
  fs.readFile(fileName, 'utf8', readCallback);
};

function existsCallback(exists) {
  if (!exists) {
    return console.error('File does not exist');
  }
  fs.stat(fileName, statCallback);
}
fs.exists(fileName, existsCallback);
