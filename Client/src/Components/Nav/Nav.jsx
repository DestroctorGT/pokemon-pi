import React from "react";
import Logo from "../../Assets/pokemonLogo.png";
import styles from "../Nav/Nav.module.css";

export default function Nav() {
  return (
    <nav>
      <ul className={styles.navBar}>
        <li>
          <img src={Logo} alt="pokemon logo" className={styles.logo} />
        </li>
      </ul>
    </nav>
  );
}
