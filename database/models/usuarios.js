module.exports = function(sequelize, dataTypes) {
  let alias = "Usuario"

  let cols = {
    email: {
      type: dataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    nombre:{
      type: dataTypes.STRING
    },
    password:{
      type: dataTypes.STRING
    }
  }

  let config = {
      tableName: "usuarios",
      timestamps: false
  }

  let Usuario = sequelize.define(alias, cols, config);

  return Usuario;
}