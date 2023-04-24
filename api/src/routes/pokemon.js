//requerimos a la libreria express
const express = require("express");

//requerimos al objeto router de la libreria express
const router = express.Router();

//requerimos al controller getAllPokemos para crear la ruta get pokemons
const getAllPokemons = require("../controllers/getAllPokemons");

router.get("/getpokemons", getAllPokemons); //localhost:3001/pokemon/getpokemons

//exportamos a router para luego conectarlo al server en app.js
module.exports = router;
