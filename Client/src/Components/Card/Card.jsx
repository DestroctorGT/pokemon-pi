import React from "react";
import pokemonCardLogo from "../../Assets/pokemonimg4.png";
import styles from "../Card/Card.module.css";

export default function Card() {
  return (
    <div className={styles.card}>
      <img src={pokemonCardLogo} alt="pokemon card pic" />
      <h2>Pikachu</h2>
      <div className={styles.typeCardContainer}>
        <div className={styles.typeCard}>
          <h2>type</h2>
          <p>Normal</p>
        </div>
      </div>
    </div>
  );
}
