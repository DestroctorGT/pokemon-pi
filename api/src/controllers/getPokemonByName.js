const axios = require("axios");

//Requerimos al modelo Pokemon
const { Pokemon, Type } = require("../db");

async function getPokemonByName(req, res) {
  try {
    //El name viene por query //localhost:3001/pokemon?name= ... <-
    const { name } = req.query;

    //Se crea un array para ir pusheando los datos recibidos de la API y db.
    const newPokemons = [];

    //Se busca en la db el pokemon por name.
    const pokemonDB = await Pokemon.findAll({
      //Usamos el condicional where para que matchee con el name recibido por query.
      where: { name: name.toLowerCase() },

      attributes: ["id", "name", "image"],

      //La propiedad include nos trae la info de la relacion PokemonTypes
      include: {
        model: Type,
        attributes: ["name"], //usamos la propiedad attributes para que solo nos traiga el name y no el ID
      },
    });

    //recorremos el json que nos devuelve la db y pusheamos los objetos al array newPokemons.
    if (pokemonDB.length > 0) {
      pokemonDB.forEach((element) => {
        newPokemons.push({
          id: element.id,
          name: element.name,
          image: element.image,

          /*Mapeamos el array types recibido en el json para guardar solo la propiedad name.
            Ej: ['fire', 'normal'] */
          types: element.Types.map((ty) => {
            return ty.name;
          }),
        });
      });
    } else {
      //Si no existe el pokemon en la db, se trae el pokemon de la API por NAME.
      const { data } = await axios(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );

      //Si la respuesta devuelve una data, esta se pushea al array.
      if (Object.keys(data).length > 0) {
        newPokemons.push({
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"]["front_default"],

          /*Mapeamos el array types recibido en el json para guardar solo la propiedad name.
            Ej: ['fire', 'normal'] */
          types: data.types.map((ty) => {
            return ty.type.name;
          }),
        });
      }
    }

    res.status(200).json(newPokemons);
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = getPokemonByName;
