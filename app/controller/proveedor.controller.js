// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../model");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

const normalizeEstado = (value) => {
    if (typeof value === "boolean") {
        return value;
    }

    if (value === null || value === undefined || value === "") {
        return false;
    }

    const normalized = String(value).trim().toLowerCase();

    if (normalized === "activo" || normalized === "true" || normalized === "1") {
        return true;
    }

    if (normalized === "inactivo" || normalized === "false" || normalized === "0") {
        return false;
    }

    return Boolean(value);
};

// Create and Save a new Proveedor
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre_proveedor) {
        res.status(400).send({
            message: "El nombre del proveedor es obligatorio."
        });
        return;
    }

    // Create a Proveedor, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const proveedor = {
        identificacion: req.body.identificacion,
        nombre_proveedor: req.body.nombre_proveedor,
        ubicacion: req.body.ubicacion,
        contacto: req.body.contacto,
        producto_servicio: req.body.producto_servicio || req.body.servicio || req.body.producto || null,
        estado: normalizeEstado(req.body.estado)
    };

    // Save a new Proveedor into the database
    Proveedor.create(proveedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el Proveedor."
            });
        });
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const nombre_proveedor = req.query.nombre_proveedor;
    var condition = nombre_proveedor ? { nombre_proveedor: { [Op.iLike]: `%${nombre_proveedor}%` } } : null;

    Proveedor.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los proveedores."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const identificacion = req.params.identificacion;

    Proveedor.findOne({ where: { identificacion: identificacion } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el proveedor con identificacion=${identificacion}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al obtener el proveedor con identificacion=" + identificacion
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const identificacion = req.params.identificacion;

    Proveedor.update(req.body, {
        where: { identificacion: identificacion }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El proveedor se actualizó correctamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el proveedor con identificacion=${identificacion}. Tal vez el proveedor no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el proveedor con identificacion=" + identificacion
            });
        });
};

// Delete a Proveedor with the specified identificacion in the request
exports.delete = (req, res) => {
    const identificacion = req.params.identificacion;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where identificacion = parametro que recibimos 
    Proveedor.destroy({
        where: { identificacion: identificacion }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El proveedor se eliminó correctamente."
                });
            } else {
                res.send({
                    message: `No se puede eliminar el proveedor con identificacion=${identificacion}. El proveedor no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el proveedor con identificacion=" + identificacion
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Proveedor .destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} proveedores se eliminaron correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los proveedores."
            });
        });
};

// find all active Client, basado en el atributo estado vamos a buscar que solo los proveedores activos
exports.findAllStatus = (req, res) => {
    Proveedor.findAll({ where: { estado: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los proveedores."
            });
        }); 
};



