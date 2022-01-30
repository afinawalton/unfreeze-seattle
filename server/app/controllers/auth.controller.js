const db = require('../models');
const config = require('../config/auth.config.js');
const User = db.users;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signUpUser = (req, res) => {
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

    User.create({
        first_name: req.body.first_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        birthdate: req.body.birthdate,
        work: req.body.work,
        interests: req.body.interests,
        pronouns: req.body.pronouns,
        city: req.body.city,
        neighborhood: req.body.neighborhood,
        resident_type: req.body.resident_type,
        years_in_wa: req.body.years_in_wa,
        user_profile: {
            bio: req.body.user_profile.bio,
            top_interest: req.body.user_profile.top_interest,
            blurb: req.body.user_profile.blurb,
            prompt_answers: req.body.user_profile.prompt_answers,
            profile_pic: req.body.user_profile.profile_pic
        }
    }, {
        include: [{
            association: User.UserProfile
        }]
    })
        .then(data => {
            res.status(201).send(data);
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
                id: user.id,
                first_name: user.first_name,
                email: user.email,
                resident_type: user.resident_type,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};