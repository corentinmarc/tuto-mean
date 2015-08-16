var fs = require('fs');
var readStream = fs.createReadStream('foo.txt');
var writeStream = fs.createWriteStream('bar.txt');
readStream.pipe(writeStream);
