//Importamos todas las variables encargadas de ejecutar las acciones.
import { UPDATE_CARDS, ADD_BY_NAME } from "./types";

//Nuestro estado inicial.
const initialState = {
  pokemons: [],
  pokemonDetail: {},
  pokemonsTypes: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CARDS:
      return {
        ...state,
        pokemons: payload,
      };

    case ADD_BY_NAME:
      return {
        ...state,
        pokemons: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
