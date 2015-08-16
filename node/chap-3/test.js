var m = require('math-module');

console.log('time after first require ' + m.now);

console.log(m.add(10, 4));
console.log(m.multiply(2,6));
console.log(m.factorial(21));
try{
  m.privateMethod();
} catch(e) {
  console.log(e);
  console.log('eh oui, c\'est une methode privée!');
}

setTimeout(function () {
  m = require('math-module');
  console.log('time after second require ' + m.now);
}, 5000);
