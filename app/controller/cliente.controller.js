// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../model");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Cliente
exports.create = (req, res) => {
    // Validamos que dentro del request no venga vacio el nombre, de lo contrario retorna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El contenido no puede estar vacio."
        });
        return;
    }

    // Crear un Cliente con la estructura del request para enviarla al modelo.
    const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email || req.body.correo,
        telefono: req.body.telefono,
        ingreso: req.body.ingreso,
        // Si status no viene en el request, se asigna false por defecto.
        status: req.body.status ? req.body.status : false
    };

    // Guardar un nuevo Cliente en la base de datos
    Cliente.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al crear el Cliente."
            });
        });
};

// Obtener todos los Clientes de la base de datos.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Cliente.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los clientes."
            });
        });
};

// Obtener un Cliente por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cliente.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el Cliente con id=" + id
            });
        });
};

// Actualizar un Cliente por el id enviado en el request
exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Cliente fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Cliente con id=${id}. Puede que no exista o que req.body este vacio.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Cliente con id=" + id
            });
        });
};

// Eliminar un Cliente por el id recibido en el request
exports.delete = (req, res) => {
    const id = req.params.id;
    // Utilizamos destroy para eliminar el objeto con el id recibido.
    Cliente.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Cliente fue eliminado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el Cliente con id=${id}. El cliente no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Cliente con id=" + id
            });
        });
};

// Eliminar todos los Clientes de la base de datos.
exports.deleteAll = (req, res) => {
    Cliente.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `Se eliminaron ${nums} clientes correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al eliminar todos los clientes."
            });
        });
};

// Obtener todos los Clientes activos usando el atributo status.
exports.findAllStatus = (req, res) => {
    Cliente.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los clientes activos."
            });
        }); 
};


