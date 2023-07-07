import React from "react";
import styles from "../SignUp/SignUp.module.css";
import pokemonLanding from "../../Assets/pokemonimg2.webp";
import { Link } from "react-router-dom";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useState } from "react";

//Importamos la funcion validadora.
import validation from "./Validation";

export default function SignUp() {
  const [iconsPassword, setIconsPassword] = useState(true);

  const [iconsConfirmP, setIconsConfirmP] = useState(true);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: {},
  });

  function switchIconPassword() {
    iconsPassword ? setIconsPassword(false) : setIconsPassword(true);
  }

  function switchIconConfirmP() {
    iconsConfirmP ? setIconsConfirmP(false) : setIconsConfirmP(true);
  }

  function handleInput(e) {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputValue,
      error: validation(e.target),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <article className={styles.landingPage}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <div id={styles.inputsForm}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleInput}
          />

          {inputs.error.email ? (
            <p style={{ color: "red", maxWidth: "50ch" }}>
              {inputs.error.email}
            </p>
          ) : null}
        </div>

        <div id={styles.inputsForm}>
          <label htmlFor="password">password</label>
          <div>
            <input
              type={!iconsPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleInput}
            />
            <button id={styles.passwordButton} onClick={switchIconPassword}>
              {!iconsPassword ? <IconEye /> : <IconEyeClosed />}
            </button>
          </div>

          {inputs.error.password ? (
            <p style={{ color: "red", maxWidth: "50ch" }}>
              {inputs.error.password}
            </p>
          ) : null}
        </div>

        <div id={styles.inputsForm}>
          <label htmlFor="confirm password">confirm password</label>
          <div>
            <input
              type={!iconsConfirmP ? "text" : "password"}
              id="confirm password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleInput}
            />
            <button id={styles.passwordButton} onClick={switchIconConfirmP}>
              {!iconsConfirmP ? <IconEye /> : <IconEyeClosed />}
            </button>
          </div>

          {inputs.error.confirmP ? (
            <p style={{ color: "red", maxWidth: "50ch" }}>
              {inputs.error.confirmP}
            </p>
          ) : null}
        </div>

        <div id={styles.buttonForm}>
          <button type="submit" className={styles.registerFormButton}>
            sign up
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p>Already have an account?</p>
            <Link to={"/signIn"}>Sign In</Link>
          </div>
        </div>
      </form>

      <img
        src={pokemonLanding}
        alt="landing page pokemon img"
        id={styles.pokemonLandingImg}
      />
    </article>
  );
}
