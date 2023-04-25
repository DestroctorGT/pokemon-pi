const axios = require("axios");

async function getPokemonById(req, res) {
  try {
    const { id } = req.params;

    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const pokemonDetail = {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"]["front_default"],
      life: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
    };
    res.status(200).json(pokemonDetail);
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = getPokemonById;

/*
ID. *
Nombre. *
Imagen. *
Vida. *
Ataque. *
Defensa. *

ID.
Nombre.
Imagen.
Vida.
Ataque.
Defensa.
Tipo.
*/
