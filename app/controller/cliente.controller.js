// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".
const db = require("../model");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Cliente
exports.create = async (req, res) => {
    try {

        if (!req.body.nombre) {
            return res.status(400).send({
                message: "El contenido no puede estar vacio."
            });
        }

        const cliente = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email || req.body.correo,
            telefono: req.body.telefono,
            ingreso: req.body.ingreso,
            status: req.body.status ? req.body.status : false
        };

        const data = await Cliente.create(cliente);

        res.send(data);

    } catch (err) {

        res.status(500).send({
            message: err.message || "Ocurrio un error al crear el Cliente."
        });

    }
};

// Obtener todos los Clientes
exports.findAll = async (req, res) => {
    try {

        const nombre = req.query.nombre;

        const condition = nombre
            ? { nombre: { [Op.iLike]: `%${nombre}%` } }
            : null;

        const data = await Cliente.findAll({ where: condition });

        res.send(data);

    } catch (err) {

        res.status(500).send({
            message: err.message || "Ocurrio un error al obtener los clientes."
        });

    }
};

// Obtener un Cliente por id
exports.findOne = async (req, res) => {
    try {

        const id = req.params.id;

        const data = await Cliente.findByPk(id);

        res.send(data);

    } catch (err) {

        res.status(500).send({
            message: "Error al obtener el Cliente con id=" + id
        });

    }
};

// Actualizar un Cliente
exports.update = async (req, res) => {
    try {

        const id = req.params.id;

        const num = await Cliente.update(req.body, {
            where: { id: id }
        });

        if (num == 1) {
            res.send({
                message: "El Cliente fue actualizado correctamente."
            });
        } else {
            res.send({
                message: `No se pudo actualizar el Cliente con id=${id}. Puede que no exista o que req.body este vacio.`
            });
        }

    } catch (err) {

        res.status(500).send({
            message: "Error al actualizar el Cliente con id=" + id
        });

    }
};

// Eliminar un Cliente
exports.delete = async (req, res) => {
    try {

        const id = req.params.id;

        const num = await Cliente.destroy({
            where: { id: id }
        });

        if (num == 1) {
            res.send({
                message: "El Cliente fue eliminado correctamente."
            });
        } else {
            res.send({
                message: `No se pudo eliminar el Cliente con id=${id}. El cliente no fue encontrado.`
            });
        }

    } catch (err) {

        res.status(500).send({
            message: "No se pudo eliminar el Cliente con id=" + id
        });

    }
};

// Eliminar todos los Clientes
exports.deleteAll = async (req, res) => {
    try {

        const nums = await Cliente.destroy({
            where: {},
            truncate: false
        });

        res.send({
            message: `Se eliminaron ${nums} clientes correctamente.`
        });

    } catch (err) {

        res.status(500).send({
            message: err.message || "Ocurrio un error al eliminar todos los clientes."
        });

    }
};

// Obtener todos los Clientes activos
exports.findAllStatus = async (req, res) => {
    try {

        const data = await Cliente.findAll({
            where: { status: true }
        });

        res.send(data);

    } catch (err) {

        res.status(500).send({
            message: err.message || "Ocurrio un error al obtener los clientes activos."
        });

    }
};

