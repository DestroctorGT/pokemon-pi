const axios = require("axios");

//Requerimos a los modelos Pokemon y Type para buscarlos y agrearlos al new Json.
const { Pokemon, Type } = require("../db");

//Funcion encargada de traer los pokemons filtrados por tipo.
//(Busca en la API(Por ahora tiene limite de 100 pokemones maximo) y DB).
async function filterPokemon(req, res) {
  try {
    //La peticion recibe por query el type, encargado de elegir el tipo de filtrado.
    const { type } = req.query;

    /*Se hace una peticion al endpoint que trae 100 pokemones.
    pero es un objeto que tiene una propiedad results (que es un array) y adentro de esta tiene {name, url} */
    const { data } = await axios(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100"
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

            /*Mapeamos el array types recibido en el json para guardar solo la propiedad name.
              Ej: ['fire', 'normal'] */
            types: pokemon.data.types.map((ty) => {
              return ty.type.name;
            }),
          });
        });

        //En esta parte filtramos los pokemons por el tipo recibido por query.
        const newFilter = mainArray.filter(
          (ty) => ty.types[0] === type || ty.types[1] === type
        );

        //Se busca en la db todos los pokemons que se hayan creado.
        const pokemonDB = await Pokemon.findAll({
          attributes: ["name", "image"],

          //La propiedad include nos trae la info de la relacion PokemonTypes
          include: {
            model: Type,

            //usamos la propiedad attributes para que solo nos traiga el name y no el ID
            attributes: ["name"],

            //Usamos el condicional where para que matchee con el type recibido por query.
            where: { name: type },
          },
        });

        //Si los encuentra, los pushea al array newFilter.
        if (pokemonDB.length > 0) {
          pokemonDB.forEach((element) => {
            newFilter.push({
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
        }

        //Reseta el mainArray para poder guardar los internal arrays.
        mainArray = [];

        //La longitud maxima permitida del internal Array.
        const maxObjectPerArray = 12;

        /*El numero resultante de la division de la longitud maxima con la longitud del array de objetos 
        filtrados. */
        const numArrays = Math.ceil(newFilter.length / maxObjectPerArray);

        //Recorremos el array filtrado para poder pushear cada objeto al internalArray.
        newFilter.forEach((element) => {
          internalArray.push(element);

          /*Si la longitud del internalArray es igual al resultado de la division anterior, este se pushea
          al Array Principal y el internal Array se resetea a para seguir a la siguiente vuelta. */
          if (internalArray.length === numArrays) {
            mainArray.push(internalArray);
            internalArray = [];
          }
        });

        res.status(200).json(mainArray);
      });
    }
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = filterPokemon;

// [[{},{},{},{},{},{},{},{},{},{},{},{}], [{},{},{},{},{},{},{},{},{},{},{},{}]]
