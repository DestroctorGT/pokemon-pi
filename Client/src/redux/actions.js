//Importamos las variables Types.
import { UPDATE_CARDS } from "./types";

//Importamos axios para hacer peticiones al server
import axios from "axios";

//Variable encargada de aumentar o disminuir la pagina de los pokemons
var offset = 0;

/*Funcion encargada de traer los pokemons al iniciar la app en la home page.
Esta recibe como parametro un boolean (True or False), en donde el true corresponde el aumento por 12
la variable offset y False corresponde a disminuir por 12. (Si el parametro es undefined, este se resetea)
*/
export function updateCards(addOrDecrease) {
  if (addOrDecrease === undefined || offset < 1) {
    offset = 0;
  }

  if (addOrDecrease === true && offset <= 1281) {
    offset += 12;
  }

  if (addOrDecrease === false) {
    offset -= 12;
  }
  return async function (dispatch) {
    let { data } = await axios(
      `http://localhost:3001/pokemons?offset=${offset}`
    );

    return dispatch({ type: UPDATE_CARDS, payload: data });
  };
}
