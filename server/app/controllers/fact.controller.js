const db = require('../models');
let Fact = db.facts;
const Op = db.Sequelize.Op;

// Get a random fact from db
exports.getRandomFact = (req, res) => {
    Fact.findAll({
        order: db.Sequelize.literal('random()'),
        limit: 1 })
            .then((data) => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving a fact."
                })
            }) 
}