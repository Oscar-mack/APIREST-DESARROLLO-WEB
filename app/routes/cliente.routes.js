module.exports = app => {
    const clientes = require("../controller/cliente.controller.js");
    var router = require("express").Router();
    // Crear un nuevo Cliente
    router.post("/create/", clientes.create);
    // Obtener todos los Clientes
    router.get("/", clientes.findAll);
    // Obtener todos los Clientes activos
    router.get("/status", clientes.findAllStatus);
    // Obtener un Cliente por id
    router.get("/:id", clientes.findOne);
    // Actualizar un Cliente por id
    router.put("/update/:id", clientes.update);
    // Eliminar un Cliente por id
    router.delete("/delete/:id", clientes.delete);
    // Eliminar todos los Clientes
    router.delete("/delete/", clientes.deleteAll);
    // Podemos utilizar app.use("EndPoint", router) para simplificar el URI
    // Ej. http://localhost:Puerto/api/cliente/
    
    
    app.use("/api/cliente", router);
};

