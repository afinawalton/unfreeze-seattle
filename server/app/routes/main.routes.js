module.exports = app => {
    const neighborhoods = require('../controllers/neighborhood.controller.js');
    const interests = require('../controllers/interest.controller.js');
    const facts = require('../controllers/fact.controller.js');

    let router = require('express').Router();

    router.get('/interests', interests.findAll);

    router.get('/neighborhoods', neighborhoods.findAll);

    router.get('/neighborhoods/:id', neighborhoods.findOne);

    router.get('/fact', facts.getRandomFact);

    app.use('/api', router);
}