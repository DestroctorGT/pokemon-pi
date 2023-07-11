import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Detail/Detail.module.css";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

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
    <article className={styles.cardContainer}>
      <div className={styles.card}>
        <ul className={styles.editContainer}>
          <li>
            <button>
              <IconEdit />
            </button>
          </li>
          <li>
            <h2>#{pokemon.id}</h2>
          </li>
          <li>
            <button>
              <IconTrash />
            </button>
          </li>
        </ul>
        <img src={pokemon.image} alt="pokemon card pic" />
        <h2>{pokemon.name}</h2>
        <div className={styles.typeCardContainer}>
          <div className={styles.typeCard}>
            <p
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                cursor: "default",
              }}
            >
              ⚔️ {pokemon.attack}
            </p>
          </div>
          <div className={styles.typeCard}>
            <p
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                cursor: "default",
              }}
            >
              🛡️ {pokemon.defense}
            </p>
          </div>
        </div>
        <div className={styles.typeCardContainer}>
          {/*Mapeamos el array types que recibimos por props para renderizarlos en un div*/}
          {pokemon.types &&
            pokemon.types.map((type, index) => {
              return (
                <div className={styles.typeCard} key={index}>
                  <p
                    style={{
                      fontSize: "medium",
                      fontWeight: "bold",
                      cursor: "default",
                    }}
                  >
                    {type}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </article>
  );
}
