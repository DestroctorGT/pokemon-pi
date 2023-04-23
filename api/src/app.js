//requerimos a la libreria express y luego la ejecutamos en una const llamada app
const express = require("express");
const app = express();

//requerimos a las rutas
const routes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// by CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //Autorizo recibir solicitudes de este dominio
  res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); //Autorizo recibir solicitudes con dichos hedears
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
  next();
});

// ROUTES
app.use("/", routes);

module.exports = app;
