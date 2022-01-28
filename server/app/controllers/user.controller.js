const db = require('../models');
let User = db.users;
const Op = db.Sequelize.Op;

// Create a new user
exports.createNewUser = (req, res) => {

    // Get user profile info a new user profile
    const userProfile = {
        bio: req.body.user_profile.bio,
        top_interest: req.body.user_profile.top_interest,
        blurb: req.body.user_profile.blurb,
        prompt_answers: req.body.user_profile.prompt_answers,
        profile_pic: req.body.user_profile.profile_pic,
        // This structure looks like a nested object
        // {
        //     "How are you today?": "I'm well thanks",
        //     "How will you be tomorrow?": "Hopefully just as good!"
        // }
    }

    // let missing = "";
    
    // if (!req.body.user_profile.top_interest) {
    //     missing = 'Top interest';
    //     res.status(400).send({
    //         message: `${missing} cannot be empty!`
    //     });
    //     return;
    // } else if (!req.body.user_profile.blurb) {
    //     missing = 'Email';
    //     res.status(400).send({
    //         message: `${missing} cannot be empty!`
    //     });
    //     return;
    // } else if (!req.body.user_profile.prompt_answers) {
    //     missing = 'Birthdate';
    //     res.status(400).send({
    //         message: `${missing} cannot be empty!`
    //     });
    //     return;
    // }

    // Create a new user
    let user = {
        first_name: req.body.first_name,
        email: req.body.email,
        password: req.body.password,
        birthdate: req.body.birthdate,
        work: req.body.work,
        interests: req.body.interests,
        pronouns: req.body.pronouns,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        resident_type: req.body.resident_type,
        years_in_wa: req.body.years_in_wa,
        user_profile: userProfile
    };

    if (!req.body.first_name) {
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
    } else if (!req.body.password) {
        missing = 'Password';
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
    } else if (!req.body.resident_type) {
        missing = 'Resident type';
        res.status(400).send({
            message: `${missing} cannot be empty!`
        });
        return;
    }

    // Check if user exists in db
    let userExists = 'someUser';
    User.findOne({ where: { email: req.body.email } })
        .then((res) => {
            userExists = res;
        })
        .then(() => {
            if (userExists === null) {
                // Save user in db
                User.create(user, {
                    include: [{
                        association: User.UserProfile
                    }]
                })
                    .then(data => {
                        res.status(201).send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Some error occurred while creating the User."
                        });
                    });
            } else {
                res.status(400).send({ message: 'User with that email already exists!', userExists: userExists});
            }
        })
};

// Get all users
exports.getUsersByResidency = (req, res) => {
    // Allow to find users by local or transplant
    const residentType = req.query.residentType;
    let condition = residentType ? { resident_type: { [Op.iLike]: `%${residentType}` } } : null;

    User.findAll({ where: condition })
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
// Allow user to log in with valid credentials
// exports.authenticateUserWithEmail = (user) => {
//     return new Promise((resolve, reject) => {
//         try {
//             User.findOne({
//                 where: {
//                     email: user.email // user email
//                 }
//             }).then(async (response) => {
//                 if (!response) {
//                     resolve(false);
//                 } else {
//                     if (!response.dataValues.password ||
//                     !await response.validPassword(user.password,
//                         response.dataValues.password)) {
//                             resolve(false);
//                     } else {
//                         resolve(response.dataValues)
//                     }
//                 }
//             })
//         } catch (error) {
//             const response = {
//                 status: 500,
//                 data: {},
//                 error: {
//                     message: 'User match failed'
//                 }
//             };
//             reject(response);
//         }
//     })
// }

// Update a user
exports.updateUser = (req, res) => {
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
exports.deleteUser = (req, res) => {
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