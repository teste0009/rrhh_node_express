module.exports = function(sequelize, dataTypes) {
  let alias = "Ciudad"

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre:{
      type: dataTypes.STRING
    }
  }

  let config = {
      tableName: "ciudades",
      timestamps: false
  }

  let Ciudad = sequelize.define(alias, cols, config);

  Ciudad.associate = function(models) {
    Ciudad.hasMany(models.Departamento, { // 1 to many
      as: "Departamento",
      foreignKey: "id_ciudad"
    });
  }

  return Ciudad;
}