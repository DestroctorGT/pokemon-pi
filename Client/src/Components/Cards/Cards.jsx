import React from "react";
import styles from "../Cards/Cards.module.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

//Importamos useEffect para poder ejecutar el dispatch que nos trae los pokemons al iniciar la app.
import { useEffect } from "react";

//Importamos el objeto connect que nos ayuda a suscribirnos a redux
import { connect } from "react-redux";
import {
  updateCards,
  getPokemonTypes,
  filterSortingActivate,
  filterPokemon,
} from "../../redux/actions";

//El dispatch y el state lo recibe por props
export function Cards({
  pokemons,
  pokemonsFilter,
  pokemonsTypes,
  updateCards,
  getPokemonTypes,
  filterSortingActivate,
  filtersAndSorting,
  filterPokemon,
  pokemonsFilterIndex,
}) {
  /*Cuando el componente se monta, se ejecuta la funcion updateCards y getPokemonTypes
  encargada de traer los pokemons y los tipos*/
  useEffect(() => {
    updateCards();
    getPokemonTypes();
  }, []);

  //Funcion encargada de hacer dispatch al redux y filtrar los pokemons por tipo
  function handleFilter(e) {
    const { value } = e.target;

    filterPokemon(value);
  }

  function handleFilterOn() {
    filterSortingActivate("FILTER ON");
  }

  function handleFilterOff() {
    filterSortingActivate("FILTER OFF");
    updateCards();
  }

  function handleSortOn() {
    filterSortingActivate("SORT ON");
  }

  function handleSortOff() {
    filterSortingActivate("SORT OFF");
    updateCards();
  }

  return (
    <article>
      <div className={styles.filterContainters}>
        {filtersAndSorting.is_filter_on === false ? (
          <button onClick={handleFilterOn}>
            <span class="material-symbols-outlined">filter_alt_off</span>
          </button>
        ) : (
          <button onClick={handleFilterOff}>
            <span class="material-symbols-outlined">filter_alt</span>
          </button>
        )}

        <div>
          <select name="filter" onChange={handleFilter}>
            {/*Mapeamos el json pokemonTypes para renderizar etiquetas option*/}

            {pokemonsTypes &&
              pokemonsTypes.map((element, index) => {
                return <option value={element}>{element}</option>;
              })}
          </select>
        </div>

        {filtersAndSorting.is_sorting_on === false ? (
          <button onClick={handleSortOn}>SORT OFF</button>
        ) : (
          <button onClick={handleSortOff}>
            <span class="material-symbols-outlined">sort</span>
          </button>
        )}

        <div>
          <select name="order"></select>
        </div>
      </div>

      <div className={styles.cardContainer}>
        {/* mapeamos el array pokemons para renderizar un componente Card y por props le enviamos su data */}
        {pokemons &&
          pokemons.map((element, index) => {
            return (
              <Card
                id={element.id}
                name={element.name}
                image={element.image}
                types={element.types}
              />
            );
          })}

        {pokemonsFilter &&
          pokemonsFilter[pokemonsFilterIndex]?.map((element, index) => {
            return (
              <Card
                id={element.id}
                name={element.name}
                image={element.image}
                types={element.types}
              />
            );
          })}
      </div>
      <Pagination></Pagination>
    </article>
  );
}

//Creamos la funcion mapState para traernos el array pokemons del estado inicial.
export function mapState(state) {
  return {
    pokemons: state.pokemons,
    filtersAndSorting: state.filtersAndSorting,
    pokemonsFilter: state.pokemonsFilter,
    pokemonsFilterIndex: state.pokemonsFilterIndex,
    pokemonsTypes: state.pokemonsTypes,
  };
}

//Creamos la funcion mapDispatch para poder ejecutar los dispatchs creados en el reducer.
export function mapDispatch(dispatch) {
  return {
    updateCards: (addOrDecrease) => dispatch(updateCards(addOrDecrease)),
    getPokemonTypes: () => dispatch(getPokemonTypes()),
    filterSortingActivate: (str) => dispatch(filterSortingActivate(str)),
    filterPokemon: (type) => dispatch(filterPokemon(type)),
  };
}

export default connect(mapState, mapDispatch)(Cards);
