module.exports = app => {
    const neighborhoods = require('../controllers/neighborhood.controller.js');

    let router = require('express').Router();

    // Get all interests
    router.get('/', neighborhoods.findAll);

    app.use('/neighborhoods', router);
}