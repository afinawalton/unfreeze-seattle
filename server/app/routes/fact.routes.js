module.exports = app => {
    const facts = require('../controllers/fact.controller.js');

    let router = require('express').Router();

    // Get one random fact
    router.get('/', facts.getRandomFact);

    app.use('/didyouknow', router);
}