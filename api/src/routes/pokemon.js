//requerimos a la libreria express
const express = require("express");

//requerimos al objeto router de la libreria express
const router = express.Router();

//requerimos al controller getAllPokemos para crear la ruta get pokemons
const getAllPokemons = require("../controllers/getAllPokemons");

//requerimos al controller getPokemonByid para crear la ruta pokemons/:id
const getPokemonById = require("../controllers/getPokemonById");

//requerimos al controller getPokemonByid para crear la ruta pokemonsname?=
const getPokemonByName = require("../controllers/getPokemonByName");

//requerimos al controller createPokemon para crear la ruta createpokemon
const createPokemon = require("../controllers/createPokemon");

//requerimos al controller getPokemonTypes para crear la ruta pokemontypes
const getPokemonTypes = require("../controllers/getPokemonTypes");

router.get("/pokemons", getAllPokemons); //localhost:3001/pokemon/pokemons
router.get("/pokemons/:id", getPokemonById); //localhost:3001/pokemon/pokemons/:id
router.get("/pokemons", getPokemonByName); //localhost:3001/pokemon/pokemons?name=...
router.post("/createpokemon", createPokemon); //localhost:3001/pokemon/createpokemon
router.get("/pokemontypes", getPokemonTypes); //localhost:3001/pokemon/pokemontypes

//exportamos a router para luego conectarlo al server en app.js
module.exports = router;
