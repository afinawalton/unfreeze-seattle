module.exports = app => {
    const neighborhoods = require('../controllers/neighborhood.controller.js');
    const interests = require('../controllers/interest.controller.js');
    const facts = require('../controllers/fact.controller.js');

    let router = require('express').Router();

    // Get all interests
    router.get('/interests', interests.findAll);

    // Get all neighborhoods
    router.get('/neighborhoods', neighborhoods.findAll);

    // Get one random fact
    router.get('/fact', facts.getRandomFact);

    // app.use('/didyouknow', router);
    app.use('/api', router);
}