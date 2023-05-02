//Importamos todas las variables encargadas de ejecutar las acciones.
import {
  UPDATE_CARDS,
  ADD_BY_NAME,
  GET_POKEMON_TYPES,
  FILTER_POKEMON,
} from "./types";

//Nuestro estado inicial.
const initialState = {
  pokemons: [],
  pokemonsFilter: [],
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

    case GET_POKEMON_TYPES:
      return {
        ...state,
        pokemonsTypes: payload,
      };

    case FILTER_POKEMON:
      const slicePokemons = payload.slice(0, 12);

      return {
        ...state,
        pokemons: slicePokemons,
        pokemonsFilter: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
