const db = require('../models');
let Neighborhood = db.neighborhoods;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Neighborhood.findAll({ attributes: ["id", "name"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving neighborhoods."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Neighborhood.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Neighborhood with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving neighborhoods."
            });
        });
};