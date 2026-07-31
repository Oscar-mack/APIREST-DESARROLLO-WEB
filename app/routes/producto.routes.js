module.exports = app => {
    const producto = require("../controller/producto.controller.js");
    var router = require("express").Router();
    // Create a new Producto
    router.post("/create/", producto.create);
    // Retrieve all Producto
    router.get("/", producto.findAll);
    // Retrieve all published Producto
    router.get("/status", producto.findAllStatus);
    // Retrieve a single Producto with id
    router.get("/:id", producto.findOne);
    // Update a Producto with id
    router.put("/update/:id", producto.update);
    // Delete a Producto with id
    router.delete("/delete/:id", producto.delete);
    // Delete all Producto
    router.delete("/delete/", producto.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/producto /
    app.use("/api/producto", router);
};









