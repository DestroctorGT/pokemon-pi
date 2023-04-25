//requerimos a la libreria express
const express = require("express");

//requerimos al objeto router de la libreria express
const router = express.Router();

//requerimos al controller getAllPokemos para crear la ruta get pokemons
const getAllPokemons = require("../controllers/getAllPokemons");

//requerimos al controller getPokemonByid para crear la ruta getpokemonid
const getPokemonById = require("../controllers/getPokemonById");

//requerimos al controller getPokemonByid para crear la ruta getpokemonbyname
const getPokemonByName = require("../controllers/getPokemonByName");

router.get("/getpokemons", getAllPokemons); //localhost:3001/pokemon/getpokemons
router.get("/getpokemonid/:id", getPokemonById); //localhost:3001/pokemon/getpokemonid/:id
router.get("/getPokemonByName", getPokemonByName); //localhost:3001/pokemon/getpokemonbyname/name?=...

//exportamos a router para luego conectarlo al server en app.js
module.exports = router;
