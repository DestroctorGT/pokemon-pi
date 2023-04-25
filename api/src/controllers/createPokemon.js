const { Pokemon } = require("../db");

async function createPokemon(req, res) {
  try {
    const { name, image, life, attack, defense, type1, type2 } = req.body;

    const newPokemon = { name, image, life, attack, defense, type1, type1 };

    const pokemon = Pokemon.create({ newPokemon });

    res.status(200).json(pokemon);
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = createPokemon;
