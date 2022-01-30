module.exports = app => {
    const { authJwt } = require('../middleware');
    const users = require('../controllers/user.controller.js');

    // let router = require('express').Router();

    // AUTHENTICATION ROUTES
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/test/all', users.allAccess);

    app.get(
        '/test/local',
        [authJwt.verifyToken, authJwt.isLocal],
        users.localBoard
    );

    app.get(
        '/test/transplant',
        [authJwt.verifyToken, authJwt.isTransplant],
        users.transplantBoard
    );

    // Create a new user
    // router.post('/', users.createNewUser);

    // Get all users
    // router.get('/', users.getUsersByResidency);

    // Get one user by id
    // router.get('/:id', users.getOneUser);

    // Update one user
    // router.put('/:id', users.updateUser);

    // Delete a user
    // router.delete('/:id', users.deleteUser);

    // app.use('/users', router);
}