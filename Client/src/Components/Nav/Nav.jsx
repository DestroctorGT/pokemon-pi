import React from "react";

//Importamos useState para crear un estado local para el valor del input
import { useState } from "react";

import Logo from "../../Assets/pokemonLogo.png";
import pokeballInput from "../../Assets/pokeball-input.png";
import styles from "../Nav/Nav.module.css";

/*Importamos el objeto Link para poder redirigir la pagina a determinada ruta.
Y tambien el objeto useLocation para saber en cual ruta nos encontramos mientras navegamos por la app.
*/
import { Link, useLocation } from "react-router-dom";

//Importamos el objeto connect que nos ayuda a suscribirnos a redux
import { connect } from "react-redux";

//Importamos la accion addByName.
import { addByName, updateCards } from "../../redux/actions";

//El dispatch lo recibe por props
export function Nav({ addByName, updateCards }) {
  const location = useLocation();

  //Creamos un nuevo estado local para saber en tiempo real el valor del input.
  const [inputValue, setInputValue] = useState("");

  //Funcion encargada de cambiar el estado local al valor que el usuario ingresa.
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <nav>
      <ul className={styles.navBar}>
        <li>
          <Link to="/">
            <img src={Logo} alt="pokemon logo" className={styles.logo} />
          </Link>
        </li>

        <li>
          <div
            className={
              location.pathname === "/home"
                ? styles.searchBarContainer
                : styles.disableSearchBar
            }>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search"
              className={styles.searchBarInput}></input>

            <input
              className={styles.searchBarButton}
              type="image"
              src={pokeballInput}
              alt="search bar button input"
              onClick={() => addByName(inputValue)}
            />
          </div>
        </li>
      </ul>
    </nav>
  );
}

//Creamos la funcion mapDispatch para poder ejecutar los dispatchs creados en el reducer.
export function mapDispatch(dispatch) {
  return {
    addByName: (name) => dispatch(addByName(name)),
    updateCards: (addOrDecrease) => dispatch(updateCards(addOrDecrease)),
  };
}

export default connect(null, mapDispatch)(Nav);
