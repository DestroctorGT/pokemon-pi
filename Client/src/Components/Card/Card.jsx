import React from "react";
import styles from "../Card/Card.module.css";

//El componente Card recibe por props la data de los pokemons que trajo Redux al iniciar la app
export default function Card({ name, image, types }) {
  return (
    <div className={styles.card}>
      <img src={image} alt="pokemon card pic" />
      <h2>{name}</h2>
      <div className={styles.typeCardContainer}>
        {/*Mapeamos el array types que recibimos por props para renderizarlos en un div*/}
        {types &&
          types.map((type, index) => {
            return (
              <div className={styles.typeCard} key={index}>
                <h2>type</h2>
                <p>{type}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
