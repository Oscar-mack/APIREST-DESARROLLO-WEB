module.exports = app => {
	const proveedores = require("../controller/proveedor.controller.js");
	var router = require("express").Router();

	router.post("/create/", proveedores.create);
	router.get("/", proveedores.findAll);
	router.get("/status", proveedores.findAllStatus);
	router.get("/:identificacion", proveedores.findOne);
	router.put("/update/:identificacion", proveedores.update);
	router.delete("/delete/:identificacion", proveedores.delete);
	router.delete("/delete/", proveedores.deleteAll);

	app.use("/api/proveedor", router);
};
