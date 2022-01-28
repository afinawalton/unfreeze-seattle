const db = require('../models');
let Neighborhood = db.neighborhoods;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Neighborhood.findAll({ attributes: ["name"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving neighborhoods."
            });
        });
};