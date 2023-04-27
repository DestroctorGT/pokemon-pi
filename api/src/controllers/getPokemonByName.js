const axios = require("axios");

//Requerimos al modelo Pokemon
const { Pokemon } = require("../db");

async function getPokemonByName(req, res) {
  try {
    //El name viene por query //localhost:3001/pokemon/getpokemonbyname/name?= ... <-
    const { name } = req.query;

    //Se trae el pokemon de la API por NAME.
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);

    //Se busca en la db el pokemon por name.
    const pokemonDB = await Pokemon.findOne({
      //Usamos el condicional where para que matchee con el name recibido por query.
      where: { name: name },

      //La propieda include nos trae la info de la relacion PokemonTypes
      include: {
        model: Type,
        attributes: ["name"], //usamos la propiedad attributes para que solo nos traiga el name y no el ID
      },
    });

    console.log(pokemonDB);
    //Se crea un nuevo array de objetos con los datos recibidos de la API y db.
    const newPokemons = [
      {
        name: data.name,
        image: data.sprites.other["official-artwork"]["front_default"],
        types: data.types,
      },
      pokemonDB,
    ];

    res.status(200).json(newPokemons);
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = getPokemonByName;
