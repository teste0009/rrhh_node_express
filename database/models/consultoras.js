module.exports = function(sequelize, dataTypes) {
  let alias = "Consultoras"

  let cols = {
    cuit: {
      type: dataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false
    },
    razon_social:{
      type: dataTypes.STRING
    }
  }

  let config = {
      tableName: "consultoras",
      timestamps: false
  }

  let Consultoras = sequelize.define(alias, cols, config);

  Consultoras.associate = function(models) {
    Consultoras.hasMany(models.Contratados, { // 1 to many
      as: "Contratados",
      foreignKey: "cuit_consultora"
    });
  }

  return Consultoras;
}