//requerimos el objeto DataTypes de sequelize
const { DataTypes } = require("sequelize");

/*Exportamos el modelo que contiene una funcion que va a requerir de sequelize que esta en la config
de la db */

module.exports = (sequelize) => {
  sequelize.define("Type", {
    id: { type: DataTypes.INTEGER, primaryKey: true },

    name: { type: DataTypes.STRING },
  });
};
