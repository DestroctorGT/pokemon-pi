import React from "react";
import styles from "../LandingPage/LandingPage.module.css";
import pokemonImg from "../../Assets/pokemonimg2.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <article className={styles.landingPage}>
      <div>
        <h1>Pokemon App</h1>
        <Link to="/home">
          <button className={styles.buttonLanding}>Let's begin the game</button>
        </Link>
      </div>

      <img
        src={pokemonImg}
        alt="pokemon landing page"
        className={styles.logo}
      />
    </article>
  );
}
