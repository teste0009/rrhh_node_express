const db = require('../database/models');

const hola = 'Hola Mundo';
const ciudades = db['Ciudad'].findAll({
  where: {
    // id: 2
  }
});
const departamentos = db['Departamento'].findAll({
  where: {},
  include: [{association:"Ciudad"}], // , {association: "actores"}
}); // codigo: 110

let testController = (req, res, next) => {

  let [pageTitle, name, animals] = ['Tests', 'Enzo', ['Cat', 'Dog', 'Wolf']]

  // const {ciudades, departamentos, hola} = require('../controller/tests.js'); NO USADO, FUERA DE CONTEXTO

  // const user = require('../controller/User.js');

  // console.log(express);
  // console.log(req.user);
  // console.log(req.session);
  // req.user.getSession(req);

  // , req.user.login('admin@email.com', '1B287D7CFA9BAD74FE30CBBC5DBA2D05', req)
  // enzo@gmail.com

  Promise.all([ciudades, departamentos])
    .then( results => { // console.log(results);
      const [ciudades, departamentos] = results; // console.log(ciudades);
      // console.log('- - - - - - -'); console.log(req.session);console.log('- - - - - - -');
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

}

module.exports = testController;
