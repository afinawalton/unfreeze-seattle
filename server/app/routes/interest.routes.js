module.exports = app => {
    const interests = require('../controllers/interest.controller.js');

    let router = require('express').Router();

    // Get all interests
    router.get('/', interests.findAll);

    app.use('/interests', router);
}