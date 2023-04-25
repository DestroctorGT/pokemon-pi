const axios = require("axios");

//Esta funcion es encargada de traer un pokemon por ID desde la API o la DB y mostrarlo en pantalla.
async function getPokemonById(req, res) {
  try {
    //El ID viene por params //localhost:3001/pokemon/getpokemonid/:id <-
    const { id } = req.params;

    //Se trae el pokemon de la API por ID.
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);

    //Se crea un nuevo objeto con la data recibida.
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
