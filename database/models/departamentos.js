module.exports = function(sequelize, dataTypes){
  let alias = "Departamento";

  let cols = {
    codigo: {
      type: dataTypes.INTEGER,
      primaryKey: true,
    },
    id_ciudad: {
      type: dataTypes.INTEGER,
    },
    area: {
      type: dataTypes.ENUM('Producción','Finanzas','Marketing','RRHH'),
      defaultValue: false,
    },
    descripcion: {
      type: dataTypes.STRING
    }
  }

  let config = {
      tableName: "departamentos",
      timestamps: false
  }

  let Departamento = sequelize.define(alias, cols, config);

  Departamento.associate = function(models){
    Departamento.belongsTo(models.Ciudad, { // Many to 1
      as: "Ciudad",
      foreignKey: "id_ciudad"
    });

    /*
    Departamento.belongsToMany(models.Actor, {
      as: "actores",
      through : "movie_actor",
      foreignKey: "movie_id",
      otherKey: "actor_id",
      timestamps: false
    });
    */
  }
  return Departamento;
}