const axios = require("axios");

//Requerimos a los modelos Pokemon y Type para buscarlos y agrearlos al new Json.
const { Pokemon, Type } = require("../db");
const { or } = require("sequelize");

//Funcion encargada de traer los pokemons filtrados por tipo.
//(Busca en la API(Por ahora tiene limite de 100 pokemones maximo) y DB).
async function sortPokemons(req, res) {
  try {
    //La peticion recibe por query el type, encargado de elegir el tipo de filtrado.
    const { order, type } = req.query;

    /*Se hace una peticion al endpoint que trae 100 pokemones.
    pero es un objeto que tiene una propiedad results (que es un array) y adentro de esta tiene {name, url} */
    const { data } = await axios(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=140"
    );

    /*se crea un array vacio para guardar todas las peticiones y posteriormente, realizarlas todas
    en un promise all */
    const promisesURl = [];

    /*se recorre el resultado de la peticion al endpoint "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100" 
    para luego pushearlo al array proimisesURL */
    data.results.forEach((element) => {
      //En cada iteracion, las urls se guardan como promesas y tienen un estado pending
      let newData = axios(element.url);

      promisesURl.push(newData);
    });

    /* si el array promisesURL no esta vacio entonces se ejecutan todas las promesas en el metodo
    promise.all y luego se crea un nuevo array llamado newJson para ir pusheando los datos recibidos*/

    if (promisesURl.length > 0) {
      Promise.all(promisesURl).then(async (poke) => {
        //Array principal que contendra los arrays internos de objetos filtrados.
        let mainArray = [];

        //Array interno que contendra los objetos filtrados.
        let internalArray = [];

        poke.forEach((pokemon) => {
          mainArray.push({
            id: pokemon.data.id,
            name: pokemon.data.name,

            image:
              pokemon.data.sprites.other["official-artwork"]["front_default"],

            attack: pokemon.data.stats[1].base_stat,

            /*Mapeamos el array types recibido en el json para guardar solo la propiedad name.
              Ej: ['fire', 'normal'] */
            types: pokemon.data.types.map((ty) => {
              return ty.type.name;
            }),
          });
        });

        //Se busca en la db todos los pokemons que se hayan creado.
        const pokemonDB = await Pokemon.findAll({
          attributes: ["id", "name", "image", "attack"],

          //La propiedad include nos trae la info de la relacion PokemonTypes
          include: {
            model: Type,

            //usamos la propiedad attributes para que solo nos traiga el name y no el ID
            attributes: ["name"],
          },
        });

        //Si los encuentra, los pushea al array mainArray.
        if (pokemonDB.length > 0) {
          pokemonDB.forEach((element) => {
            mainArray.push({
              id: element.id,
              name: element.name,
              image: element.image,
              attack: element.attack,

              /*Mapeamos el array types recibido en el json para guardar solo la propiedad name.
                Ej: ['fire', 'normal'] */
              types: element.Types.map((ty) => {
                return ty.name;
              }),
            });
          });
        }

        //Creamos un nuevo array llamado newSort para guardar los pokemons ordenados
        let newSort = [];

        //Si el type enviado por query es name, se ordera por ese tipo
        if (type === "name") {
          newSort = mainArray.sort((a, b) => {
            //Si la orden enviada por query es A, se ordena Ascendente.
            if (order === "A") {
              if (a.name < b.name) {
                return -1;
              }
            }

            //Si la orden enviada por query es D, se ordena Descendente.
            if (order === "D") {
              if (a.name > b.name) {
                return -1;
              }
            }

            return 1;
          });

          //Si el type enviado por query es attack, se ordera por ese tipo
        } else if (type === "attack") {
          newSort = mainArray.sort((a, b) => {
            //Si la orden enviada por query es A, se ordena Ascendente.
            if (order === "A") {
              return a.attack - b.attack;
            }

            //Si la orden enviada por query es D, se ordena Descendente.
            if (order === "D") {
              return b.attack - a.attack;
            }

            return a.attack - b.attack;
          });
        } else {
          //Si el type es undefined, se ordena usando el tipo name por defecto.
          newSort = mainArray.sort((a, b) => {
            return a.name - b.name;
          });
        }

        //Reseta el mainArray para poder guardar los internal arrays.
        mainArray = [];

        //La longitud maxima permitida del internal Array.
        const maxObjectPerArray = 12;

        /*El numero resultante de la division de la longitud maxima con la longitud del array de objetos 
        ordenados. */
        const numArrays = Math.ceil(newSort.length / maxObjectPerArray);

        /*Hacemos un bucle for iniciando desde 0 hasta el numero resultante de la division entre 
        la longitud del array ordenado y el numero maximo de objetos.*/
        for (let i = 0; i < numArrays; i++) {
          /*En cada iteracion, cortamos el array ordenado iniciando desde la posicion i multiplicado por 12
          hasta la posicion i + 1 multiplicado por 12*/

          internalArray = newSort.slice(i * 12, (i + 1) * 12);

          mainArray.push(internalArray);
        }

        res.status(200).json(mainArray);
      });
    }
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = sortPokemons;

// [[{},{},{},{},{},{},{},{},{},{},{},{}], [{},{},{},{},{},{},{},{},{},{},{},{}]]
