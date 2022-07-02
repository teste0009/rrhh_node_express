var express = require('express');
var router = express.Router();

let evaluacionesController = require ('../controllers/evaluaciones');

/* GET Evaluaciones page. */
router.get('/', evaluacionesController);


module.exports = router;
