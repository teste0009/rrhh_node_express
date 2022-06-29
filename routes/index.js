var express = require('express');
var router = express.Router();

let loginHomeController = require ('../controllers/loginHome');

let loginPostController = require ('../controllers/loginPost');

/* GET Login or Home page. */
router.get('/', loginHomeController);

router.post('/', loginPostController);

/*
router.get('/', function(req, res, next) {
  // console.log(req.session);
  res.render('index', { title: 'Express' });
});
*/

module.exports = router;
