//Importamos todas las variables encargadas de ejecutar las acciones.
import { UPDATE_CARDS } from "./types";

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
        pokemons: [...state.pokemons, payload],
      };

    default:
      return state;
  }
};

export default rootReducer;
