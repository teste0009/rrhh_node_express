var express = require('express');
var router = express.Router();

let testController = require('../controllers/tests');

/* GET Tests page. */
router.get('/', testController);

module.exports = router;
