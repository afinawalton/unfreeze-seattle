module.exports = app => {
    const users = require('../controllers/user.controller.js');

    let router = require('express').Router();

    // Create a new user
    router.post('/', users.createNewUser);

    // Get all users
    router.get('/', users.getUsersByResidency);

    // Get one user by id
    router.get('/:id', users.getOneUser);

    // Update one user
    router.put('/:id', users.updateUser);

    // Delete a user
    router.delete('/:id', users.deleteUser);

    app.use('/users', router);
}