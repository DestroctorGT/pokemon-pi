//requerimos el objeto DataTypes de sequelize
const { DataTypes } = require("sequelize");

/*Exportamos el modelo que contiene una funcion que va a requerir de sequelize que esta en la config
de la db */

module.exports = (sequelize) => {
  sequelize.define("Pokemon", {
    name: { type: DataTypes.STRING },

    image: { type: DataTypes.STRING },

    life: { type: DataTypes.INTEGER },

    attack: { type: DataTypes.INTEGER },

    defense: { type: DataTypes.INTEGER },
  });
};
