var express = require('express');
var router = express.Router();

/* GET Tests page. */
router.get('/', function(req, res, next) {

  const {ciudades, departamentos, hola} = require('../controller/tests.js');

  Promise.all([ciudades, departamentos])
    .then( results => { // console.log(results);
      const [ciudades, departamentos] = results; // console.log(ciudades);
      res.render('tests', { title: 'Mundo', name: 'Enzo', animals: ['Cat', 'Dog', 'Wolf'], ciudades, departamentos, saludo: hola, error: false });
    })
    .catch( error => {
      // console.log(error);
      res.render('tests', { title: 'Mundo', name: 'Enzo', animals: ['Cat', 'Dog', 'Wolf'], ciudades: false, departamentos: false, saludo: hola, error: error });
    })
    .finally( () => {
      console.log('Finally!');
    });

});

module.exports = router;
