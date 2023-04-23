//requerimos el objeto DataTypes de sequelize
const { DataTypes } = require("sequelize");

/*Exportamos el modelo que contiene una funcion que va a requerir de sequelize que esta en la config
de la db */

module.exports = (sequelize) => {
  sequelize.define("type", {
    id: { type: DataTypes.INTEGER },

    name: { type: DataTypes.STRING },
  });
};
