const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'No token provided!'
        });
    }

    jwt.verify(token, process.env.CONFIG_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isLocal = (req, res, next) => {
    console.log('Searching for Local', req.userId);
    User.findByPk(req.userId)
        .then(user => {
            console.log('User found?', user)
            if (user.resident_type === 'local') {
                next();
                return;
            }

            res.status(403).send({
                message: "Must be a Local to view this content!"
            });
            return;
        })
}

const isTransplant = (req, res, next) => {
    console.log('Searching for Transplant', req.userId);
    User.findByPk(req.userId)
        .then(user => {
        if (user.resident_type === 'transplant') {
            next();
            return;
        }

        res.status(403).send({
            message: "Must be a Transplant to view this content!"
        });
        return;
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isLocal: isLocal,
    isTransplant: isTransplant
};
module.exports = authJwt;