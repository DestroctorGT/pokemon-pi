//Importamos las variables Types.
import {
  UPDATE_CARDS,
  ADD_BY_NAME,
  GET_POKEMON_TYPES,
  FILTER_SORTING_ACTIVATE,
  FILTER_POKEMON,
  FILTER_POKEMON_NEXT,
  FILTER_POKEMON_PREV,
} from "./types";

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

//Funcion encargada de buscar el pokemon por nombre. (Puede traer pokemons de la API como la DB)
export function addByName(name) {
  return async function (dispatch) {
    let { data } = await axios(`http://localhost:3001/pokemon?name=${name}`);

    return dispatch({ type: ADD_BY_NAME, payload: data });
  };
}

//Funcion encargada de traer los tipos de pokemones de la API y guardarlos en la db para su posterior consumo
export function getPokemonTypes() {
  return async function (dispatch) {
    let { data } = await axios("http://localhost:3001/pokemontypes");

    /*Mapeamos el json que nos devuelve el server para solo tener un array de los tipos
    ejem: ["normal", "fire", "poison"] */
    const arrayTypes = data.map((type) => type.name);

    return dispatch({ type: GET_POKEMON_TYPES, payload: arrayTypes });
  };
}

//Funcion encargada de activar las opciones de filtrado u ordenamiento.
export function filterSortingActivate(str) {
  return {
    type: FILTER_SORTING_ACTIVATE,
    payload: str,
  };
}

//Funcion encargada de filtrar los pokemones por tipo de la API y la DB.
export function filterPokemon(type) {
  return async function (dispatch) {
    let { data } = await axios(
      `http://localhost:3001/filterPokemons?type=${type}`
    );

    return dispatch({ type: FILTER_POKEMON, payload: data });
  };
}

//Funcion encargada de avanzar a la siguiente "pagina" en el array de pokemons filtrados.
export function nextPageFilterPokemon() {
  return {
    type: FILTER_POKEMON_NEXT,
  };
}

//Funcion encargada de retroceder a la "pagina" en el array de pokemons filtrados.
export function prevPageFilterPokemon() {
  return {
    type: FILTER_POKEMON_PREV,
  };
}
