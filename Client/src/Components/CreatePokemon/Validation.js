//Creamos un objeto llamado error
let error = {};

//Funcion encargada de validar los inputs del form.
export default function validateInputs(pokemonData) {
  if (pokemonData.name === "name") {
    if (pokemonData.value.length <= 0) {
      error.name = "El campo no puede estar vacio";
    } else {
      delete error.name;
    }
  }

  if (pokemonData.name === "health") {
    if (Number(pokemonData.value) <= 0) {
      error.health = "El minimo tiene que ser 1";
    } else {
      delete error.health;
    }
  }

  if (pokemonData.name === "attack") {
    if (Number(pokemonData.value) <= 0) {
      error.attack = "El minimo tiene que ser 1";
    } else {
      delete error.attack;
    }
  }

  if (pokemonData.name === "defense") {
    if (Number(pokemonData.value) <= 0) {
      error.defense = "El minimo tiene que ser 1";
    } else {
      delete error.defense;
    }
  }

  return error;
}
