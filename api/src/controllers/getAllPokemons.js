const axios = require("axios");

//Requerimos a los modelos Pokemon y Type para buscarlos y agrearlos al new Json.
const { Pokemon, Type } = require("../db");

//Esta funcion es encargada de traer los 20 pokemones para ser mostrados en la Home Page al iniciar la app
async function getAllPokemons(req, res) {
  try {
    //La peticion recibe por query el offset, encargado de avanzar o retroceder el numero de pagina.
    const { offset } = req.query;

    /*se hace una peticion get al endpoint que trae los 12 primeros pokemones
    pero es un objeto que tiene una propiedad results (que es un array) y adentro de esta tiene {name, url} */
    const { data } = await axios(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`
    );

    /*se crea un array vacio para guardar todas las peticiones y posteriormente, realizarlas todas
    en un promise all */
    const promisesURl = [];

    /*se recorre el resultado de la peticion al endpoint "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12" 
    para luego pushearlo al array proimisesURL */
    data.results.forEach((element) => {
      let newData = axios(element.url);

      promisesURl.push(newData);
    });

    /* si el array promisesURL no esta vacio entonces se ejecutan todas las promesas en el metodo
    promise.all y luego se crea un nuevo array llamado newJson para ir pusheando los datos recibidos*/

    if (promisesURl.length > 0) {
      Promise.all(promisesURl).then(async (poke) => {
        const newJSON = [];

        poke.forEach((pokemon) => {
          newJSON.push({
            name: pokemon.data.name,
            image:
              pokemon.data.sprites.other["official-artwork"]["front_default"],

            /*Mapeamos el array types recibido en el json para guardar solo la propiedad name.
            Ej: ['fire', 'normal'] */
            types: pokemon.data.types.map((ty) => {
              return ty.type.name;
            }),
          });
        });

        //Si el offset se encuentra en la ultima pagina, se busca en la db y se agregan al array newJson
        if (parseInt(offset) === 1269) {
          //Se busca en la db todos los pokemons que se hayan creado.
          const pokemonDB = await Pokemon.findAll({
            attributes: ["name", "image"],

            //La propiedad include nos trae la info de la relacion PokemonTypes
            include: {
              model: Type,
              attributes: ["name"], //usamos la propiedad attributes para que solo nos traiga el name y no el ID
            },
          });

          //Si los encuentra, los pushea al array newJson.
          if (pokemonDB.length > 0) {
            pokemonDB.forEach((element) => {
              newJSON.push(element);
            });
          }
        }

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
