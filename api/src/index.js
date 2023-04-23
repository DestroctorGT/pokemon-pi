//requerimos a nuestra configuracion de express
const app = require("./app");

//requerimos a dotenv para traer la variable de entorno PORT
require("dotenv").config();

//Si la variable de entorno no se importa, tomaria entonces el valor 3001
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`in port http://localhost:${port}`);
});
