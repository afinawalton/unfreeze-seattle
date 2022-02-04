const db = require('../models');
let Interest = db.interests;
const Op = db.Sequelize.Op;

// Get all interests for form in React front-end
// GET /interests
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

// Get all interests that belong to a user
// GET users/:id