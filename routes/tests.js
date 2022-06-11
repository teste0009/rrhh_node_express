var express = require('express');
var router = express.Router();

/* GET Tests page. */
router.get('/', function(req, res, next) {
  // locale.name = 'Enzo'; // res.render('tests', { title: 'Mundo', name: 'Enzo' });
  res.send('respond with a resource');
});

module.exports = router;
