const db = require('../models');
const config = require('../config/auth.config.js');
const User = db.users;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Include user profile form on front-end
exports.signUpUser = (req, res) => {
    if (!req.body.email) {
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
    } else if (!req.body.resident_type) {
        missing = 'Resident type';
        res.status(400).send({
            message: `${missing} cannot be empty!`
        });
        return;
    } else if (!req.body.years_in_wa) {
        missing = 'Years in WA';
        res.status(400).send({
            message: `${missing} cannot be empty!`
        });
        return;
    }

    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        birthdate: req.body.birthdate,
        resident_type: req.body.resident_type,
        years_in_wa: req.body.years_in_wa,
        user_profile: {
            first_name: req.body.first_name,
            pronouns: req.body.pronouns,
            work: req.body.work,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            top_interest: req.body.user_profile.top_interest,
            blurb: req.body.user_profile.blurb,
            other_interests: req.body.other_interests,
            bio: req.body.user_profile.bio,
            prompt_answers: req.body.user_profile.prompt_answers,
            profile_pic: req.body.user_profile.profile_pic
        }
    }, {
        include: [{
            association: User.UserProfile
        }]
    })
        .then(user => {
            // Create token
            // token will be added to user data

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            // Return new user
            res.status(201).send({
                id: user.id,
                email: user.email,
                birthdate: user.birthdate,
                resident_type: user.resident_type,
                years_in_wa: user.years_in_wa,
                user_profile: user.user_profile,
                accessToken: token
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Some error occurred while creating the User."
            });
        });
};

exports.logInUser = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User not found.' })
            }

            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid password!'
                });
            }

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                user: user.id,
                email: user.email,
                birthdate: user.birthdate,
                resident_type: user.resident_type,
                years_in_wa: user.years_in_wa,
                user_profile: user.user_profile,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//check if user is logged in
// exports.checkUser = async (req, res, next) => {
//     let currentUser;
//     if (req.cookies.jwt) {
//        const token = req.cookies.jwt;

//        const decoded = await promisify(jwt.verify)(token, 'unfreeze-seattle-secret-key');

//        currentUser = await User.findByPk(decoded.id);
//    } else {
//      currentUser =  null;
//   }
//    res.status(200).send({ currentUser });
// };

// //log user out
// exports.logoutUser = catchAsync(async (req, res) => {
//     res.cookie('jwt', 'loggedout', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true
// });    res.status(200).send('user is logged out');
// });