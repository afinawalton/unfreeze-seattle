module.exports = app => {
    const users = require('../controllers/user.controller.js');

    const router = require('express').Router();

    router.get('/:id', users.findOne);

    app.use('/users', router);
}