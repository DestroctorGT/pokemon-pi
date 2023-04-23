//requerimos a nuestra configuracion de express
const app = require("./src/app");

//requerimos a la db de sequelize para cargar nuestras tablas
const { db } = require("./src/db");

//requerimos a dotenv para traer la variable de entorno PORT
require("dotenv").config();

//Si la variable de entorno no se importa, tomaria entonces el valor 3001
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`in port http://localhost:${port}`);
  db.sync({ force: true });
});
