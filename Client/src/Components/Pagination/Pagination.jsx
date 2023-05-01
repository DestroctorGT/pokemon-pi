import React from "react";
import styles from "../Pagination/Pagination.module.css";

//Importamos el objeto connect que nos ayuda a suscribirnos a redux
import { connect } from "react-redux";
import { updateCards } from "../../redux/actions";

//El dispatch lo recibe por props
export function Pagination({ updateCards }) {
  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={() => updateCards(false)}
        className={styles.paginationButton}>
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
      <span>Page 1 - 12</span>
      <button
        onClick={() => updateCards(true)}
        className={styles.paginationButton}>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>
    </div>
  );
}

//Creamos la funcion mapDispatch para poder ejecutar los dispatchs creados en el reducer.
export function mapDispatch(dispatch) {
  return {
    updateCards: (addOrDecrease) => dispatch(updateCards(addOrDecrease)),
  };
}

export default connect(null, mapDispatch)(Pagination);
