//Importamos las variables Types.
import { UPDATE_CARDS } from "./types";

//Importamos axios para hacer peticiones al server
import axios from "axios";

//Funcion encargada de traer los pokemons al iniciar la app en la home page.
export function updateCards() {
  return async function (dispatch) {
    let response = await axios(`http://localhost:3001/pokemons?offset=0`);

    return dispatch({ type: UPDATE_CARDS, payload: response.data });
  };
}
