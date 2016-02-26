var express = require('express');
var router = express.Router();

var entries [{ slug: "how to pass class", body:"com to class"}]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Today I Learned' });
});

module.exports = router;
