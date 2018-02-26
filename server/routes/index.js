var express = require('express');
var router = express.Router();
const path = require('path');


router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

module.exports = router;
