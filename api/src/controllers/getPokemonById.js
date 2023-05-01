const axios = require("axios");

/*Requerimos al modelo Pokemon y Type de la config de la db por si el id pasado por params esta en la tabla
Pokemons.*/
const { Pokemon, Type } = require("../db");

//Esta funcion es encargada de traer un pokemon por ID desde la API o la DB y mostrarlo en pantalla.
async function getPokemonById(req, res) {
  try {
    //El ID viene por params //localhost:3001/pokemon/getpokemonid/:id <-
    const { id } = req.params;

    //Creamos un objeto vacio y dependiendo del ID, este sera llenado con la info de la api o la db
    let pokemonDetail = {};

    //Si la longitud del ID es mayor a 4, se busca en la db. De lo contrario se busca en la api.
    if (id.length > 4) {
      //Usamos el metodo findByPk que nos ayuda a buscar el pokemon por su ID.
      pokemonDetail = await Pokemon.findByPk(id, {
        //La propieda include nos trae la info de la relacion PokemonTypes
        include: {
          model: Type,
          attributes: ["name"], //usamos la propiedad attributes para que solo nos traiga el name y no el ID
        },
      });
    } else {
      //Se trae el pokemon de la API por ID.
      const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);

      /*Mapeamos el array types recibido en el json para guardar solo la propiedad name.
      Ej: ['fire', 'normal'] */
      const pokemonTypeAPI = data.types.map((ty) => {
        return ty.type.name;
      });

      //Se sobreescribe el objeto que declaramos anteriormente con la info recibida en la api.
      pokemonDetail = {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"]["front_default"],
        life: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        types: pokemonTypeAPI,
      };
    }

    res.status(200).json(pokemonDetail); //devolvemos una respuesta con el objeto.
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
