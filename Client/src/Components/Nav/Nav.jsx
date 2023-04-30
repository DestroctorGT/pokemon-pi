import React from "react";
import Logo from "../../Assets/pokemonLogo.png";
import pokeballInput from "../../Assets/pokeball-input.png";
import styles from "../Nav/Nav.module.css";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
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
              type="text"
              placeholder="Search"
              className={styles.searchBarInput}></input>
            <input
              className={styles.searchBarButton}
              type="image"
              src={pokeballInput}
              alt="search bar button input"
            />
          </div>
        </li>
      </ul>
    </nav>
  );
}
