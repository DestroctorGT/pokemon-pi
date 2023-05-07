import React from "react";
import styles from "../CreatePokemon/CreatePokemon.module.css";

//Importamos useNavigate para poder cambiar a la ruta principal despues de hacer click al boton create
import { useNavigate } from "react-router-dom";

/*Importamos useEffect para poder ejecutar el dispatch que nos trae los pokemons al iniciar la app.
  Y el useState para crear un estado local y validar los datos del form.
*/
import { useState, useEffect } from "react";

//Importamos la funcion validadora.
import validation from "./Validation";

//Importamos axios para hacer la peticion post.
import axios from "axios";

//Importamos el objeto connect que nos ayuda a suscribirnos a redux
import { connect } from "react-redux";

//Nos traemos la action getPokemonTypes para hacer un distpach y traer los tipos de pokemons.
import { getPokemonTypes } from "../../redux/actions";

export function CreatePokemon({ pokemonsTypes, getPokemonTypes }) {
  //Creamos una instancia del objeto useNavigate.
  const navigate = useNavigate();

  /*Cuando el componente se monta, se ejecuta la funcion getPokemonTypes
  encargada de traer los tipos de pokemones.*/
  useEffect(() => {
    getPokemonTypes();
  }, []);

  //Estado local para validar los datos.
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    health: undefined,
    attack: undefined,
    defense: undefined,
    type1: [],
    type2: [],
    showText: false,
    error: {},
  });

  //Funcion encargada de mirar en tiempo real como cambia los datos y al mismo tiempo los valida.
  function handleInput(e) {
    /*Creamos estas variables para evitar que las propiedades del objeto queden dentro de un array.
    Ejem: {
      name: ['pikachu']
      image: ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png']
      attack: [1]
    }
    */
    let inputName = e.target.name;
    let inputValue = e.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputValue,
      error: validation(e.target),
    });
  }

  //Funcion encargada de limpiar los datos del estado local y de hacer un post a la db.
  function handleSubmit(e) {
    e.preventDefault();

    /*Creamos un nuevo objeto llamado newPokemon y guardamos las propiedades del estado local.
    La diferencia es que este objeto tiene una propiedad llamada: Types*/

    let newPokemon = {
      name: inputs.name,
      image: inputs.image,
      life: inputs.health,
      attack: inputs.attack,
      defense: inputs.defense,
      types: [inputs.type1, inputs.type2],
    };

    //Hacemos el post a la db pasando el objeto por body.
    axios.post("http://localhost:3001/createpokemon", newPokemon);

    //Reseteamos los valores del estado local.
    setInputs({
      name: "",
      image: "",
      health: 1,
      attack: 1,
      defense: 1,
      type1: [],
      type2: [],
      showText: true,
      error: {},
    });

    //Esperamos 2 segundos para luego ser dirigidos a la ruta /home.
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {inputs.showText === true ? <h3>Pokemon was created</h3> : null}

      <input
        type="text"
        name="name"
        value={inputs.name}
        placeholder="Name"
        onChange={handleInput}
        className={styles.inputCreate}
      />

      <input
        type="text"
        name="image"
        value={inputs.image}
        placeholder="Image"
        onChange={handleInput}
        className={styles.inputCreate}
      />

      <div className={styles.typeContainer}>
        <label>Type: </label>
        <select name="type1" onChange={handleInput}>
          {/*Mapeamos el json pokemonTypes para renderizar etiquetas option*/}

          {pokemonsTypes &&
            pokemonsTypes.map((element, index) => {
              return <option value={element}>{element}</option>;
            })}
        </select>

        <label>Type: </label>
        <select
          name="type2"
          onChange={handleInput}
          disabled={!inputs.type1.length > 0}>
          {/*Mapeamos el json pokemonTypes para renderizar etiquetas option*/}

          {pokemonsTypes &&
            pokemonsTypes.map((element, index) => {
              return <option value={element}>{element}</option>;
            })}
        </select>
      </div>

      <input
        type="text"
        name="health"
        value={inputs.health}
        placeholder="Health"
        onChange={handleInput}
        className={styles.inputCreate}
      />

      <input
        type="text"
        name="attack"
        value={inputs.attack}
        placeholder="Attack"
        onChange={handleInput}
        className={styles.inputCreate}
      />

      <input
        type="text"
        name="defense"
        value={inputs.defense}
        placeholder="Defense"
        onChange={handleInput}
        className={styles.inputCreate}
      />

      <button
        type="submit"
        className={
          Object.keys(inputs.error).length > 0 || inputs.name === ""
            ? styles.disableButton
            : styles.displayButton
        }>
        Create Pokemon
      </button>
    </form>
  );
}

//Creamos la funcion mapState para traernos el array pokemons del estado inicial.
export function mapState(state) {
  return {
    pokemonsTypes: state.pokemonsTypes,
  };
}

//Creamos la funcion mapDispatch para poder ejecutar los dispatchs creados en el reducer.
export function mapDispatch(dispatch) {
  return {
    getPokemonTypes: () => dispatch(getPokemonTypes()),
  };
}

export default connect(mapState, mapDispatch)(CreatePokemon);
