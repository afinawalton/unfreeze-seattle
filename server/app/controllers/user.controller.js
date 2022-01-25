const db = require('../models');
let User = db.users;
const Op = db.Sequelize.Op;

// const getAge = (dateString) => {
//     var today = new Date();
//     var birthDate = new Date(dateString);
//     var age = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age;
// }

// Create a new user
exports.create = (req, res) => {
    // let missing = "";

    // if (!req.body.first_name) {
    //     missing = 'First name';
    //     res.status(400).send({
    //         message: `${missing} cannot be empty!`
    //     });
    //     return;
    // } else if (!req.body.email) {
    //     missing = 'Email';
    //     res.status(400).send({
    //         message: `${missing} cannot be empty!`
    //     });
    //     return;
    // } else if (!req.body.birthdate) {
    //     missing = 'Birthdate';
    //     res.status(400).send({
    //         message: `${missing} cannot be empty!`
    //     });
    //     return;
    // } else if (!req.body.city) {
    //     missing = 'City';
    //     res.status(400).send({
    //         message: `${missing} cannot be empty!`
    //     });
    //     return;
    // } else if (!req.body.years_in_wa) {
    //     missing = 'Years in Washington';
    //     res.status(400).send({
    //         message: `${missing} cannot be empty!`
    //     });
    //     return;
    // }

    // Create a new user profile
    const userProfile = {
        bio: "Hello",
        top_interest: "Foodie",
        blurb: "This is my blurb",
        prompt_answers: {
            "How are you today?": "I'm well thanks",
            "How will you be tomorrow?": "Hopefully just as good!"
        }
    }

    // Create a new user
    // const user = {
    //     first_name: req.body.first_name,
    //     email: req.body.email,
    //     birthdate: req.body.birthdate,
    //     city: req.body.city,
    //     resident_type: req.body.resident_type,
    //     years_in_wa: req.body.years_in_wa,
    //     user_profile: userProfile
    // };
    // Dummy data in user model
    const user = {
        first_name: "Afina",
        email: "email@email.com",
        birthdate: "1995-05-30",
        city: "Seattle",
        resident_type: "local",
        years_in_wa: "8",
        user_profile: userProfile
    };

    // Save user in db
    User.create(user, {
        include: [{
            association: User.UserProfile
        }]
    })
        .then(data => {
            res.send(['User successfully created', data]);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

// Get all users
exports.findAll = (req, res) => {
    const residentType = req.query.residentType;
    let condition = residentType ? { residentType: { [Op.iLike]: `%${residentType}` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
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
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=", id
            });
        });
};

// Delete a user
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
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

// Get all locals
// exports.findAllLocals = (req, res) => {

// };

// exports.findAllTransplants = (req, res) => {

// };