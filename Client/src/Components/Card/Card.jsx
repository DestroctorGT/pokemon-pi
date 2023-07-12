import React from "react";
import styles from "../Card/Card.module.css";
import pokeColors from "../../pokemonColors.js";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

/*Importamos el objeto Link para poder redirigir la pagina a determinada ruta.
 */
import { Link } from "react-router-dom";

//El componente Card recibe por props la data de los pokemons que trajo Redux al iniciar la app
export default function Card({ id, name, image, types }) {
  let pokeColorKeys = Object.keys(pokeColors);

  const pokeCol = pokeColorKeys.filter((col) => col === types[0]);

  return (
    <div
      className={styles.card}
      style={{ backgroundColor: pokeColors[pokeCol].toString() }}
    >
      <IconHeart />
      <Link className={styles.link} to={`/detail/${id}`}>
        <img src={image} alt="pokemon card pic" />
        <h2>{name}</h2>
        <div className={styles.typeCardContainer}>
          {/*Mapeamos el array types que recibimos por props para renderizarlos en un div*/}
          {types &&
            types.map((type, index) => {
              return (
                <div className={styles.typeCard} key={index}>
                  <p>{type}</p>
                </div>
              );
            })}
        </div>
      </Link>
    </div>
  );
}
