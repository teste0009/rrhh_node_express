const db = require('../database/models');

// * * *
const empleadosLista = db['Empleados'].findAll({
  where: {},
  include: [{association:"Ciudad"}],
});

let empleadosController = {
  // * * *
  listar: (req, res, next) => {
    empleadosLista
      .then( results => {
        res.render('layout', { viewFile: 'empleados', pageTitle: 'Lista de Empleados', empleados: results});
      })
      .catch( error => {
      })
      .finally( () => {
      });
  },

  // * * *
  editar: (req, res, next) => {
    ;
  },

  // * * *
  delete: (req, res, next) => {
    ;
  }
}

module.exports = empleadosController;
