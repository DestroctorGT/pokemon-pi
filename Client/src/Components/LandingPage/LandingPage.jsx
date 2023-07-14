import React from "react";
import pokemonImg from "../../Assets/pokedexLogo.webp";
import pokemonLanding from "../../Assets/pokemonimg2.webp";
import styles from "../LandingPage/LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import setBodyColor from "../../setBodyColor";

export default function LandingPage() {
  const navigate = useNavigate();

  setBodyColor({
    color:
      "radial-gradient(circle, hsla(46, 95%, 56%, 1) 0%, hsla(350, 97%, 65%, 1) 100%)",
  });

  return (
    <section>
      <img src={pokemonImg} alt="landing page title pic" />

      <div className={styles.container}>
        <button onClick={() => navigate("/home")}>Iniciar</button>

        <img
          src={pokemonLanding}
          alt="landing page pokemon img"
          id={styles.pokemonLandingImg}
        />
      </div>
    </section>
  );
}
