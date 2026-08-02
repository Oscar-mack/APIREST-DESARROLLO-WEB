// Importamos la base de datos y los modelos
const db = require("../model");
const Departamento = db.departamentos;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Departamento
exports.create = (req, res) => {

    // Validación
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre del departamento es obligatorio."
        });
        return;
    }

    // Crear objeto Departamento
    const departamento = {
        identificacion: req.body.identificacion,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        encargado: req.body.encargado,
        ubicacion: req.body.ubicacion,
        estado: req.body.estado ? req.body.estado : "activo"
    };

    // Guardar en la base de datos
    Departamento.create(departamento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el Departamento."
            });
        });
};

// Obtener todos los Departamentos
exports.findAll = (req, res) => {

    const nombre = req.query.nombre;

    const condition = nombre
        ? { nombre: { [Op.iLike]: `%${nombre}%` } }
        : null;

    Departamento.findAll({
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los departamentos."
            });
        });

};

// Obtener un Departamento por ID
exports.findOne = (req, res) => {

    const id = req.params.id;

    Departamento.findByPk(id)
        .then(data => {

            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el Departamento con id=${id}.`
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el Departamento con id=" + id
            });
        });

};

// Actualizar un Departamento
exports.update = (req, res) => {

    const id = req.params.id;

    Departamento.update(req.body, {
        where: { id: id }
    })
        .then(num => {

            if (num == 1 || num[0] == 1) {

                res.send({
                    message: "El Departamento fue actualizado correctamente."
                });

            } else {

                res.send({
                    message: `No se pudo actualizar el Departamento con id=${id}. Puede que no exista o que el cuerpo de la petición esté vacío.`
                });

            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Departamento con id=" + id
            });
        });

};

// Eliminar un Departamento
exports.delete = (req, res) => {

    const id = req.params.id;

    Departamento.destroy({
        where: { id: id }
    })
        .then(num => {

            if (num == 1) {

                res.send({
                    message: "El Departamento fue eliminado correctamente."
                });

            } else {

                res.send({
                    message: `No se encontró el Departamento con id=${id}.`
                });

            }

        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Departamento con id=" + id
            });
        });

};

// Eliminar todos los Departamentos
exports.deleteAll = (req, res) => {

    Departamento.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `Se eliminaron ${nums} departamentos correctamente.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los departamentos."
            });
        });

};

// Obtener todos los Departamentos activos
exports.findAllStatus = (req, res) => {

    Departamento.findAll({
        where: {
            estado: "activo"
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los departamentos activos."
            });
        });

};
