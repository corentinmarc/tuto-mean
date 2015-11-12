var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.sendfile('./views/home.html');
});

module.exports = router;