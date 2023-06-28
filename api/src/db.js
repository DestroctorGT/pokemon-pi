/*Requerimos la libreria dotenv junto con las variables de entorno 
y sequelize para su posterior configuracion. */

require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");

//requerimos al modelo pokemon, type y luego le pasamos la clase sequelize.
const pokemons = require("./models/pokemon");
const typePokemon = require("./models/typePokemon");

/*Creamos una nueva clase llamada sequelize y como primer argumento pasamos nuestras credenciales 
de postgres junto con el nombre de nuestra base de datos. */


const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@:${DB_HOST}/pokemon`,
  { logging: false } //Lo seteamos en false para desactivar la info que nos sale al levantar el server.
);

/*Acá le pasamos la clase sequelize para que del lado de la carpeta models pueda ejecutar y definir 
sequelize.define */
pokemons(sequelize);
typePokemon(sequelize);

//nos traemos los modelos que acabamos de crear de la clase sequelize para hacer las relaciones

const { Pokemon, Type } = sequelize.models;

//Creamos la relacion N:N
Pokemon.belongsToMany(Type, { through: "PokemonTypes" });
Type.belongsToMany(Pokemon, { through: "PokemonTypes" });



//exportamos la clase sequelize que acabamos de crear junto con sus models.
module.exports = {
  ...sequelize.models,
  db: sequelize,
};
