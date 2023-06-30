import React from "react";
import styles from "../LandingPage/LandingPage.module.css";
import pokemonImg from "../../Assets/pokedexLogo.webp";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <article className={styles.landingPage}>
      <img src={pokemonImg} alt="landing page title pic" />

      <form className={styles.registerForm}>
        <div id={styles.inputsForm}>
          <label htmlFor="email">email</label>
          <input type="email" id="email" placeholder="Email" />
        </div>

        <div id={styles.inputsForm}>
          <label htmlFor="password">password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>

        <div id={styles.inputsForm}>
          <label htmlFor="confirm password">confirm password</label>
          <input
            type="password"
            id="confirm password"
            placeholder="Confirm Password"
          />
        </div>

        <div id={styles.buttonForm}>
          <button type="submit" className={styles.registerFormButton}>
            sign up
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p>Already have an account?</p>
            <Link>Sign In</Link>
          </div>
        </div>
      </form>
    </article>
  );
}
