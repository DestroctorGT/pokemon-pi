import React from "react";
import styles from "../Cards/Cards.module.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

//Importamos useEffect para poder ejecutar el dispatch que nos trae los pokemons al iniciar la app.
import { useEffect } from "react";

//Importamos el objeto connect que nos ayuda a suscribirnos a redux
import { connect } from "react-redux";
import { updateCards } from "../../redux/actions";

//El dispatch y el state lo recibe por props
export function Cards({ pokemons, updateCards }) {
  //Cuando el componente se monta, se ejecuta la funcion updateCards, encargada de traer los pokemons
  useEffect(() => {
    updateCards();
  }, []);

  return (
    <article>
      <div className={styles.filterContainters}>
        <div>
          <label>FILTER: </label>
          <select name="filter"></select>
        </div>

        <div>
          <label>ORDER: </label>
          <select name="order"></select>
        </div>
      </div>

      <div className={styles.cardContainer}>
        {/* mapeamos el array pokemons para renderizar un componente Card y por props le enviamos su data */}
        {pokemons &&
          pokemons.map((element, index) => {
            return (
              <Card
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
  };
}

//Creamos la funcion mapDispatch para poder ejecutar los dispatchs creados en el reducer.
export function mapDispatch(dispatch) {
  return {
    updateCards: (addOrDecrease) => dispatch(updateCards(addOrDecrease)),
  };
}

export default connect(mapState, mapDispatch)(Cards);
