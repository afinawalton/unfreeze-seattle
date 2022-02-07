const db = require('../models');
let User = db.users;
let UserProfile = db.userProfiles;
const Op = db.Sequelize.Op;

// Get all users
exports.getUsersByResidency = (req, res) => {
    // Allow to find users by local or transplant
    const residentType = req.query.residentType;
    let condition = residentType ? { resident_type: { [Op.iLike]: `%${residentType}` } } : null;

    User.findAll({
        where: condition,
        include: [User.UserProfile]
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Get one user by id
exports.getOneUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, { include: [User.UserProfile] })
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
exports.updateUserProfile = (req, res) => {
    const id = req.params.id;

    UserProfile.findOne({
        where: { user_id: id }
    })
    .then(profile => {
        profile.update(req.body, { returning: true })
        .then(data => {
            console.log('Data returned: ', data);
            res.status(200).send(data);
        })
    })
    .catch(err => {
        console.log('Error is: ', err);
        res.status(500).send({
            message: "No user found"
        });
    });
};

// Delete a user
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.clearCookie('x-access-token');
                res.send({
                message: `User ${id} was deleted successfully!`
                });
            } else {
                res.send({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Authentication testing
exports.allAccess = (req, res) => {
    res.status(200).send('Public Content.');
}

exports.localBoard = (req, res) => {
    res.status(200).send('Local Main Feed.');
}

exports.transplantBoard = (req, res) => {
    // Query into the database to get all users with transplants
    res.status(200).send('Transplant Main Feed.');
}