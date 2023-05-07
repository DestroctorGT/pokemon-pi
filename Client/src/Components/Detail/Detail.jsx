import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Detail/Detail.module.css";

export default function Detail() {
  let { id } = useParams();

  const [pokemon, setPokemon] = useState({});

  /*Cuando el componente se monta, se hace una peticion al back para buscar al pokemon por ID.
  Y cuando el componente se desmonta, se reinicia el estado local a un objeto vacio*/
  useEffect(() => {
    axios(`http://localhost:3001/pokemons/${id}`).then(({ data }) => {
      if (data.name) {
        setPokemon(data);
      } else {
        window.alert("No se encontro al personaje :(");
      }
    });

    return setPokemon({});
  }, [id]);
  return (
    <article className={styles.cardContainter}>
      <div className={styles.card}>
        <h1>{pokemon.id}</h1>
        <img src={pokemon.image} alt="pokemon card pic" />
        <h2>{pokemon.name}</h2>
        <p>{pokemon.life}</p>
        <p>{pokemon.attack}</p>
        <p>{pokemon.defense}</p>
        <div className={styles.typeCardContainer}>
          {/*Mapeamos el array types que recibimos por props para renderizarlos en un div*/}
          {pokemon.types &&
            pokemon.types.map((type, index) => {
              return (
                <div className={styles.typeCard} key={index}>
                  <h2>type</h2>
                  <p>{type}</p>
                </div>
              );
            })}
        </div>
      </div>
    </article>
  );
}
