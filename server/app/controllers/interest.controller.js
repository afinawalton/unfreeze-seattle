const db = require('../models');
let Interest = db.interests;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Interest.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving interests."
            });
        });
};