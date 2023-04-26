//Requerimos la libreria axios para hacer peticion a la api
const axios = require("axios");

//Requerimos al modelo Type.
const { Type } = require("../db");

/*Esta funcion es encargada de llamar a la api para traer los tipos de pokemones que existen y con esa info
guardarla en la tabla Types de la db Pokemons
*/
async function getPokemonTypes(req, res) {
  try {
    //Hacemos la peticion a la api para traer los tipos de pokemones. estos vienen en forma de JSON.
    const { data } = await axios("https://pokeapi.co/api/v2/type");

    //Hacemos un mapeo del array results que esta dentro de la data.
    const types = data.results.map((ty) => {
      return { name: ty.name }; //Retornamos un array de objetos para poder usar el metodo bulkCreate.
    });

    /*Antes de guardar los datos a la db, primero nos aseguramos de que no existan. 
    Si no existen los crea pero si ya existen no los crea, esto para evitar que guarden cada vez que 
    llamamos al endpoint.
    */
    const checkTypes = await Type.findAll();

    //Si el array que nos retorna el metodo findAll es vacio, entonces podemos guardar los datos.
    if (checkTypes.length === 0) {
      await Type.bulkCreate(types);
    }

    res.status(200).json(types);
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = getPokemonTypes;
