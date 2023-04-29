import React from "react";
import styles from "../LandingPage/LandingPage.module.css";
import pokemonImg from "../../Assets/pokemonimg2.png";

export default function LandingPage() {
  return (
    <article className={styles.landingPage}>
      <div>
        <h1>Pokemon App</h1>
        <button>Let's begin the game</button>
      </div>

      <img
        src={pokemonImg}
        alt="pokemon landing page"
        className={styles.logo}
      />
    </article>
  );
}
