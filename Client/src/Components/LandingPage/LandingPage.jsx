import React from "react";
import pokemonImg from "../../Assets/pokedexLogo.webp";
import SignIn from "../SignIn/SignIn";

export default function LandingPage() {
  return (
    <section>
      <img src={pokemonImg} alt="landing page title pic" />
      <SignIn />
    </section>
  );
}
