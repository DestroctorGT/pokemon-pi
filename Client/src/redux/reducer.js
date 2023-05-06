//Importamos todas las variables encargadas de ejecutar las acciones.
import { filterSortingActivate } from "./actions";
import {
  UPDATE_CARDS,
  ADD_BY_NAME,
  GET_POKEMON_TYPES,
  FILTER_SORTING_ACTIVATE,
  FILTER_POKEMON,
  SORT_POKEMON,
  FILTER_POKEMON_NEXT,
  FILTER_POKEMON_PREV,
} from "./types";

//Nuestro estado inicial.
const initialState = {
  pokemons: [],
  pokemonsFilter: [],
  pokemonsFilterIndex: 0,
  filtersAndSorting: {
    is_filter_on: false,
    is_sorting_on: false,
  },
  pokemonDetail: {},
  pokemonsTypes: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CARDS:
      return {
        ...state,
        pokemons: payload,
        pokemonsFilter: [],
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

    case FILTER_SORTING_ACTIVATE:
      let filters = false;
      let sort = false;

      switch (payload) {
        case "FILTER ON":
          filters = true;
          break;

        case "FILTER OFF":
          filters = false;
          break;

        case "SORT ON":
          sort = true;
          break;

        case "SORT OFF":
          sort = false;
          break;

        default:
          filters = false;
          sort = false;
          break;
      }
      return {
        ...state,
        filtersAndSorting: {
          ...filterSortingActivate,
          is_filter_on: filters,
          is_sorting_on: sort,
        },
      };
    case FILTER_POKEMON:
      return {
        ...state,
        pokemons: [],
        pokemonsFilter: payload,
        pokemonsFilterIndex: 0,
      };
    case SORT_POKEMON:
      return {
        ...state,
        pokemons: [],
        pokemonsFilter: payload,
        pokemonsFilterIndex: 0,
      };

    case FILTER_POKEMON_NEXT:
      return {
        ...state,
        pokemonsFilterIndex: state.pokemonsFilterIndex + 1,
      };

    case FILTER_POKEMON_PREV:
      return {
        ...state,
        pokemonsFilterIndex: state.pokemonsFilterIndex - 1,
      };

    default:
      return state;
  }
};

export default rootReducer;
