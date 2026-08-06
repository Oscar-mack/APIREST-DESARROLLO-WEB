const dotenv = require("dotenv");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({
  path: envFile
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/model");
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada correctamente.");
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

//require("./app/routes/turorial.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/departamento.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/proveedor.routes")(app);
require("./app/routes/empleado.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});





