var express = require('express');
var router = express.Router();

let empleadosController = require ('../controllers/empleados');

/* GET Lista de Empleados page. */
router.get('/', empleadosController.listar);


module.exports = router;
