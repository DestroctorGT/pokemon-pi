import React from "react";
import pokemonImg from "../../Assets/pokedexLogo.webp";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const location = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryP = queryParams.get("to");

    queryP === "signUp" ? setQuery("signUp") : setQuery("signIn");
  }, [location.search]);

  return (
    <section>
      <img src={pokemonImg} alt="landing page title pic" />
      {query === "signUp" ? <SignUp /> : <SignIn />}
    </section>
  );
}
