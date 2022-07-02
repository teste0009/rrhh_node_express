var express = require('express');
var router = express.Router();

let rotacionController = require ('../controllers/rotacion');

/* GET Rotacion page. */
router.get('/', rotacionController);


module.exports = router;
