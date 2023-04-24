const express = require("express");
const router = express.Router();
const pokemon = require("./pokemon");

/*acá usamos la ruta http://localhost:3001/pokemon y luego le pasamos el archivo pokemon.js donde contiene
todas las rutas */
router.use("/pokemon", pokemon);

module.exports = router;
