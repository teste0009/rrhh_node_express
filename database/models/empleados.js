module.exports = function(sequelize, dataTypes){
  let alias = "Empleados";

  let cols = {
    nro_legajo: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      // autoIncrement: true
    },
    id_ciudad: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    nombres: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: dataTypes.BIGINT,
      allowNull: false,
    },
    domicilio: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  }

  let config = {
      tableName: "empleados",
      timestamps: false
  }

  let Empleados = sequelize.define(alias, cols, config);

  Empleados.associate = function(models){
    Empleados.belongsTo(models.Ciudad, { // Many to 1
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

  return Empleados;
}