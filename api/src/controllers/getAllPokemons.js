const axios = require("axios");

//Esta funcion es encargada de traer los 20 pokemones para ser mostrados en la Home Page al iniciar la app
async function getAllPokemons(req, res) {
  try {
    /*se hace una peticion get al endpoint que trae los 20 primeros pokemones
    pero es un objeto que tiene una propiedad results (que es un array) y adentro de esta tiene {name, url} */
    const { data } = await axios("https://pokeapi.co/api/v2/pokemon");

    /*se crea un array vacio para guardar todas las peticiones y posteriormente, realizarlas todas
    en un promise all */
    const promisesURl = [];

    /*se recorre el resultado de la peticion al endpoint "https://pokeapi.co/api/v2/pokemon" 
    para luego pushearlo al array proimisesURL */
    data.results.forEach((element) => {
      let newData = axios(element.url);

      promisesURl.push(newData);
    });

    /* si el array promisesURL no esta vacio entonces se ejecutan todas las promesas en el metodo
    promise.all y luego se crea un nuevo array llamado newJson, */

    if (promisesURl.length > 0) {
      Promise.all(promisesURl).then((poke) => {
        const newJSON = [];

        poke.forEach((pokemon) => {
          newJSON.push({
            name: pokemon.data.name,
            image:
              pokemon.data.sprites.other["official-artwork"]["front_default"],
            types: pokemon.data.types,
          });
        });

        res.status(200).json(newJSON);
      });
    } else {
      res.status(404).json({ error: "El array promisesURL esta vacio" });
    }
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

//Se exporta la funcion y no un objeto
module.exports = getAllPokemons;
