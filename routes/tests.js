var express = require('express');
var router = express.Router();

const db = require('../database/models');
// const ciudades = require('../database/models/ciudades');
// console.log(db['Ciudad']);

// From: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
// Find all ciudades
// const ciudades = db['Ciudad'].findAll();
// console.log(ciudades.every(ciudad => ciudad instanceof db['Ciudad'])); // true
// console.log("All ciudades:", JSON.stringify(ciudades, null, 2));

// SELECT * FROM ...

// From: https://sequelize.org/docs/v6/other-topics/transactions/
try {
  const ciudades = db.sequelize.transaction(async (t) => {
    const ciudadesDb = await db['Ciudad'].findAll({ transaction: t });
    console.log("All ciudadesDb:", JSON.stringify(ciudadesDb, null, 2));
    return ciudadesDb;
  });

  // If the execution reaches this line, the transaction has been committed successfully
  // `result` is whatever was returned from the transaction callback (the `user`, in this case)
  console.log("All ciudades:", JSON.stringify(ciudades, null, 2));

} catch (error) {

  // If the execution reaches this line, an error occurred.
  // The transaction has already been rolled back automatically by Sequelize!

}


/* GET Tests page. */
router.get('/', function(req, res, next) {
  res.render('tests', { title: 'Mundo', name: 'Enzo', animals: ['Cat', 'Dog', 'Wolf'], ciudades: ciudades });
});

module.exports = router;
