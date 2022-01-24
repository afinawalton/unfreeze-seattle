module.exports = app => {
    const users = require('../controllers/user.controller.js');

    let router = require('express').Router();

    // Create a new user
    router.post('/', users.create);

    // Get all users
    router.get('/', users.findAll);

    // Get one user by id
    router.get('/:id', users.findOne);

    // Update one user
    router.put('/:id', users.update);

    // Delete a user
    router.delete('/:id', users.delete);

    app.use('/users', router);
}