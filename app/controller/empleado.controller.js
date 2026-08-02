// Importamos la base de datos y los modelos
const db = require("../model");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

const buildEmpleadoLookup = (value) => {
    const numericValue = Number(value);
    const conditions = [];

    if (String(value).trim() !== "" && !Number.isNaN(numericValue)) {
        conditions.push({ id: numericValue });
    }

    conditions.push({ identificacion: String(value) });

    return { [Op.or]: conditions };
};

const findByIdOrIdentificacion = (value) => {
    return Empleado.findOne({ where: buildEmpleadoLookup(value) });
};

// Crear y guardar un nuevo Empleado
exports.create = (req, res) => {

    const identificacion = req.body.identificacion || req.body.id || req.body.codigo || req.body.dpi || `EMP-${Date.now()}`;
    const informacionPersonal = req.body.informacion_personal || req.body.nombre || req.body.nombre_completo || null;
    const estado = typeof req.body.estado === "boolean"
        ? req.body.estado
        : req.body.estado === "activo" || req.body.estado === "true" || req.body.estado === true || req.body.estado === 1
            ? true
            : false;

    // Crear objeto Empleado
    const empleado = {
        identificacion: identificacion,
        informacion_personal: informacionPersonal,
        contacto: req.body.contacto,
        puesto_laboral: req.body.puesto_laboral,
        fecha_ingreso: req.body.fecha_ingreso,
        estado: estado
    };

    // Guardar en la base de datos
    Empleado.create(empleado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el Empleado  ."
            });
        });
};

// Obtener todos los Empleados
exports.findAll = (req, res) => {

    const identificacion = req.query.identificacion;

    const condition = identificacion
        ? { identificacion: { [Op.iLike]: `%${identificacion   }%` } }
        : null;

    Empleado.findAll({
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener del empleado."
            });
        });

};

// Obtener un Empleado por ID
exports.findOne = (req, res) => {

    const identificacion = req.params.id;

    findByIdOrIdentificacion(identificacion)
        .then(data => {

            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el Empleado con id/identificacion=${identificacion}.`
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el empleado con id/identificacion=" + identificacion
            });
        });

};

// Actualizar un Empleado
exports.update = (req, res) => {

    const identificacion = req.params.id;

    findByIdOrIdentificacion(identificacion)
        .then(existingEmployee => {
            if (!existingEmployee) {
                res.status(404).send({
                    message: `No se encontró el Empleado con id/identificacion=${identificacion}.`
                });
                return;
            }

            return Empleado.update(req.body, {
                where: { id: existingEmployee.id }
            }).then(num => {
                if (num == 1 || num[0] == 1) {
                    res.send({
                        message: "El Empleado fue actualizado correctamente."
                    });
                } else {
                    res.status(404).send({
                        message: `No se pudo actualizar el Empleado con id/identificacion=${identificacion}.`
                    });
                }
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Empleado con id/identificacion=" + identificacion
            });
        });

};

// Eliminar un Empleado
exports.delete = (req, res) => {

    const identificacion = req.params.id;

    findByIdOrIdentificacion(identificacion)
        .then(existingEmployee => {
            if (!existingEmployee) {
                res.status(404).send({
                    message: `No se encontró el Empleado con id/identificacion=${identificacion}.`
                });
                return;
            }

            return Empleado.destroy({
                where: { id: existingEmployee.id }
            }).then(num => {
                if (num == 1) {
                    res.send({
                        message: "El empleado fue eliminado correctamente."
                    });
                } else {
                    res.status(404).send({
                        message: `No se encontró el Empleado con id/identificacion=${identificacion}.`
                    });
                }
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Empleado con id/identificacion=" + identificacion
            });
        });

};

// Eliminar todos los Empleados
exports.deleteAll = (req, res) => {

    Empleado.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `Se eliminaron ${nums} empleados correctamente.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los empleados."
            });
        });

};

// Obtener todos los Empleados activos
exports.findAllStatus = (req, res) => {

    Empleado .findAll({
        where: {
            estado: true
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los empleados activos."
            });
        });

};
