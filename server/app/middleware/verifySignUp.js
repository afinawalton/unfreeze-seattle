const db = require("../models");
const User = db.users;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (user) {
                res.status(400).send({
                    message: 'User with that email already exists!'
                });
                return;
            }
        })

        next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp;