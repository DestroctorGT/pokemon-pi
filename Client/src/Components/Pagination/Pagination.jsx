import React from "react";
import styles from "../Pagination/Pagination.module.css";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

//Importamos el objeto connect que nos ayuda a suscribirnos a redux
import { connect } from "react-redux";
import {
  updateCards,
  nextPageFilterPokemon,
  prevPageFilterPokemon,
} from "../../redux/actions";

//El dispatch lo recibe por props
export function Pagination({
  updateCards,
  filtersAndSorting,
  nextPageFilterPokemon,
  prevPageFilterPokemon,
}) {
  function handleNext() {
    if (
      filtersAndSorting.is_filter_on === true ||
      filtersAndSorting.is_sorting_on === true
    ) {
      nextPageFilterPokemon();
    } else {
      updateCards(true);
    }
  }

  function handlePrev() {
    if (
      filtersAndSorting.is_filter_on === true ||
      filtersAndSorting.is_sorting_on === true
    ) {
      prevPageFilterPokemon();
    } else {
      updateCards(false);
    }
  }
  return (
    <div className={styles.paginationContainer}>
      <button onClick={handlePrev} className={styles.paginationButton}>
        <IconChevronLeft color="yellow" stroke={4} />
      </button>

      <button onClick={handleNext} className={styles.paginationButton}>
        <IconChevronRight color="yellow" stroke={4} />
      </button>
    </div>
  );
}

//Creamos la funcion mapState para traernos el objeto filtersAndSorting del estado inicial.
export function mapState(state) {
  return {
    filtersAndSorting: state.filtersAndSorting,
  };
}

//Creamos la funcion mapDispatch para poder ejecutar los dispatchs creados en el reducer.
export function mapDispatch(dispatch) {
  return {
    updateCards: (addOrDecrease) => dispatch(updateCards(addOrDecrease)),
    nextPageFilterPokemon: () => dispatch(nextPageFilterPokemon()),
    prevPageFilterPokemon: () => dispatch(prevPageFilterPokemon()),
  };
}

export default connect(mapState, mapDispatch)(Pagination);
