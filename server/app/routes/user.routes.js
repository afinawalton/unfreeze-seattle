module.exports = app => {
    const { authJwt } = require('../middleware');
    const users = require('../controllers/user.controller.js');

    // let router = require('express').Router();

    // AUTHENTICATION ROUTES
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', `${req.protocol}://${req.hostname}:3000`);
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.put(
        '/users/my-profile',
        users.updateUserProfile
    );

    // Get all users by residency type
    app.get('/users', users.getUsersByResidency);

    // Delete a user
    app.delete('/users/:id', users.deleteUser);

    // app.use('/users', router);
}