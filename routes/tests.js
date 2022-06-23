var express = require('express');
var router = express.Router();

/* GET Tests page. */
router.get('/', function(req, res, next) {

  let [pageTitle, name, animals] = ['Mundo', 'Enzo', ['Cat', 'Dog', 'Wolf']]

  const {ciudades, departamentos, hola} = require('../controller/tests.js');

  const user = require('../controller/User.js');

  console.log(req.session);

  Promise.all([ciudades, departamentos, user.login('admin@email.com', '1B287D7CFA9BAD74FE30CBBC5DBA2D05', req)]) // enzo@gmail.com
    .then( results => { // console.log(results);
      const [ciudades, departamentos] = results; // console.log(ciudades);
      // console.log(req.session);
      // console.log(departamentos);
      // console.log(departamentos[0].Ciudad);
      // res.render('tests', { pageTitle, name, animals, ciudades, departamentos, saludo: hola, error: false });
      res.render('layout', { viewFile: 'tests', pageTitle, name, animals, ciudades, departamentos, saludo: hola, error: false });
    })
    .catch( error => {
      // console.log(error);
      // res.render('tests', { pageTitle, name, animals, ciudades: false, departamentos: false, saludo: hola, error: error });
      res.render('layout', { viewFile: 'tests', pageTitle, name, animals, ciudades: false, departamentos: false, saludo: hola, error: error });
    })
    .finally( () => {
      console.log('Finally!');
    });

});

module.exports = router;
