//Requerimos al modelo Pokemon y Type de la config de la db.
const { Pokemon, Type } = require("../db");

//Esta funcion es encargada de crear nuevos pokemones y agregarlo a la tabla Pokemons de la db
async function createPokemon(req, res) {
  try {
    //Los datos para crear el nuevo pokemon vienen de req.body
    const { name, image, life, attack, defense, types } = req.body;

    /*Usamos un metodo de sequelize llamado create que nos ayuda a insertar una nueva fila a nuestra db.
    es el equivalente a "INSERT INTO"*/
    const pokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
    });

    /*Recorremos el array types que contiene 1 o los tipos de pokemon que se relaciona con la tabla 
    intermedia PokemonTypes*/
    types.forEach(async (element) => {
      /*En cada recorrido se busca el tipo de pokemon (este es el que viene por body) 
      que esta dentro de db en la tabla Type y se guarda en una variable para despues agregarla y relacionar
      el pokemon ya creado con el type*/
      const typeID = await Type.findOne({ where: { name: element } });

      await pokemon.addType(typeID);
    });

    res.status(200).json(pokemon);
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = createPokemon;
