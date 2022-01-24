const db = require('../models');
const User = require('../models/user.model.js');
const Op = db.Sequelize.Op;

const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Create a new user
exports.create = (req, res) => {
    let missing = "";

    if (!req.body.firstName) {
        missing = 'First name';
        res.status(400).send({
            message: `${missing} cannot be empty!`
        });
        return;
    } else if (!req.body.email) {
        missing = 'Email';
        res.status(400).send({
            message: `${missing} cannot be empty!`
        });
        return;
    } else if (!req.body.birthdate) {
        missing = 'Birthdate';
        res.status(400).send({
            message: `${missing} cannot be empty!`
        });
        return;
    } else if (!req.body.city) {
        missing = 'City';
        res.status(400).send({
            message: `${missing} cannot be empty!`
        });
        return;
    } else if (!req.body.yearsInWa) {
        missing = 'Years in Washington';
        res.status(400).send({
            message: `${missing} cannot be empty!`
        });
        return;
    }

    // Create a new user
    const user = {
        firstName: req.body.firstName,
        email: req.body.email,
        age: getAge(req.body.birthdate),
        city: req.body.city,
        yearsInWa: req.body.yearsInWa
    };

    // Save user in db
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// Get all users
exports.findAll = (req, res) => {

};

// Get one user by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving User with id=${id}`
            });
        });
};

// Update a user
exports.update = (req, res) => {

};

// Delete a user
exports.delete = (req, res) => {

};

// Get all locals
exports.findAllLocals = (req, res) => {

};

exports.findAllTransplants = (req, res) => {

};