//Requerimos la libreria axios para hacer peticion a la api
const axios = require("axios");

//Requerimos al modelo Type.
const { Type } = require("../db");

/*Esta funcion es encargada de llamar a la api para traer los tipos de pokemones que existen y con esa info
guardarla en la tabla Types de la db Pokemons
*/
async function getPokemonTypes(req, res) {
  try {
    /*Antes de guardar los datos a la db, primero nos aseguramos de que no existan. 
    Si no existen los crea pero si ya existen no los crea, esto para evitar que se guarden cada vez que 
    llamamos al endpoint.
    */
    const checkTypes = await Type.findAll();

    //Si el array que nos retorna el metodo findAll es vacio, entonces podemos guardar los datos.
    if (checkTypes.length === 0) {
      //Hacemos la peticion a la api para traer los tipos de pokemones. estos vienen en forma de JSON.
      const { data } = await axios("https://pokeapi.co/api/v2/type");

      //Hacemos un mapeo del array results que esta dentro de la data.
      const types = data.results.map((ty) => {
        return { name: ty.name }; //Retornamos un array de objetos para poder usar el metodo bulkCreate.
      });

      await Type.bulkCreate(types);

      res.status(200).json(types);
    } else {
      /*Si al principio los encuentra, entonces se omite todo el proceso de llamado a la api y guardado
        de la db. Lo que hace entonces es retornar los datos que encontro en un primer lugar.
        */
      res.status(200).json(checkTypes);
    }
  } catch (error) {
    //Si no hubo algun otro error se retorna el error.
    res.status(404).json({ message: error });
  }
}

module.exports = getPokemonTypes;
