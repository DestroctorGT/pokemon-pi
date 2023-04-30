import React from "react";
import Logo from "../../Assets/pokemonLogo.png";
import pokeballInput from "../../Assets/pokeball-input.png";
import styles from "../Nav/Nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul className={styles.navBar}>
        <li>
          <Link to="/">
            <img src={Logo} alt="pokemon logo" className={styles.logo} />
          </Link>
        </li>

        <li>
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchBarInput}></input>
          </div>
        </li>
      </ul>
    </nav>
  );
}
