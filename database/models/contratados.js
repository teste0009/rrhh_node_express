module.exports = function(sequelize, dataTypes){
  let alias = "Contratados";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nro_legajo: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    cuit_consultora: {
      type: dataTypes.BIGINT,
      allowNull: false,
    },
    valor_hora: {
      type: dataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    valor_hora_extra: {
      type: dataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    desde: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    hasta: {
      type: dataTypes.DATE,
      defaultValue: null,
    },
  }

  let config = {
      tableName: "contratados",
      timestamps: false
  }

  let Contratados = sequelize.define(alias, cols, config);

  Contratados.associate = function(models){
    Contratados.belongsTo(models.Consultoras, { // Many to 1
      as: "Consultoras",
      foreignKey: "cuit_consultora"
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

  return Contratados;
}