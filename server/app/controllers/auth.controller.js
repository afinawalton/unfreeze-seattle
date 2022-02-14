const db = require('../models');
const config = require('../config/auth.config.js');
const User = db.users;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signUpUser = async (req, res) => {
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
            first_name: req.body.user_profile.first_name,
            pronouns: req.body.user_profile.pronouns,
            work: req.body.user_profile.work,
            neighborhood: req.body.user_profile.neighborhood,
            top_interest: req.body.user_profile.top_interest,
            blurb: req.body.user_profile.blurb,
            other_interests: req.body.user_profile.other_interests,
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
            const token = jwt.sign({ id: user.id }, config.secret, {});
            console.log('Signed user token: ', token);
            
            // Add cookie to response = accessed with req.cookies
            return res.cookie('x-access-token', token, {
                maxAge: 3600000, // 1 hr in milliseconds
                httpOnly: true,
                // signed: true,
                // sameSite: 'none',
                // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
            })
            .status(201)
            .send({
                id: user.id,
                email: user.email,
                birthdate: user.birthdate,
                resident_type: user.resident_type,
                years_in_wa: user.years_in_wa,
                user_profile: user.user_profile
            })
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
                    message: 'Invalid password!'
                });
            }
            // Create token by signing user's id to the token
            const token = jwt.sign({ id: user.id }, config.secret, {});
            console.log('Signed user token: ', token);
            
            // Add cookie to response = accessed with req.cookies
            return res.cookie('x-access-token', token, {
                maxAge: 3600000, // 1 hr in milliseconds
                httpOnly: true,
                // signed: true,
                // sameSite: 'none',
                // secure: true
            })
            .status(200)
            .send({
                id: user.id,
                email: user.email,
                birthdate: user.birthdate,
                resident_type: user.resident_type,
                years_in_wa: user.years_in_wa,
                user_profile: user.user_profile
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Check if user is logged in
exports.checkUser = async (req, res) => {
    // Initialize var to store current user data
    let currentUser;
    // Check whether the request has a cookie called 'jwt'
    // In this case, it doesn't for some reason
    if (req.cookies['x-access-token']) {
        // Create a token and set it to the token stored in the jwt cookie
       const token = req.cookies['x-access-token'];
       console.log('Token successfully used in request.');
    
       // Verifies that the provided token has been 'signed' onto the appropriate secret/key
        jwt.verify(token, config.secret, (err, decoded) => {
            User.findByPk(decoded.id, { include: [User.UserProfile] })
            .then(user => {
                currentUser = user;
                console.log('User from database: ', currentUser);
                currentUser.password = undefined;
                return res.status(200).send(currentUser);
            })
            .catch(err => {
                console.log(err);
            })
        })
   } else {
     currentUser =  null;
     res.status(200).send('');
  }
};

// //log user out
exports.logoutUser = async (req, res) => {
    res.clearCookie('x-access-token', {
        maxAge: 3600000,
        httpOnly: true
    });

    return res.status(200).send('User successfully logged out!');
};