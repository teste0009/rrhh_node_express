var express = require('express');
var router = express.Router();

let testController = require('../controller/tests');

/* GET Tests page. */
router.get('/', testController);

module.exports = router;
