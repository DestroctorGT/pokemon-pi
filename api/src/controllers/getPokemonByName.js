const axios = require("axios");

async function getPokemonByName(req, res) {
  try {
    //El name viene por query //localhost:3001/pokemon/getpokemonbyname/name?= ... <-
    const { name } = req.query;

    //Se trae el pokemon de la API por NAME.
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);

    //Se crea un nuevo objeto con los datos recibidos de la API.
    const newPokemon = {
      name: data.name,
      image: data.sprites.other["official-artwork"]["front_default"],
      types: pokemon.data.types,
    };

    res.status(200).json(newPokemon);
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = getPokemonByName;
