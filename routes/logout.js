var express = require('express');
var router = express.Router();

/* GET Logout page. */
router.get('/', function(req, res, next) {

  req.user.logout(req);
  console.dir('Route Logout:');
  console.log(req.session);

  res.redirect('/');
});

module.exports = router;
