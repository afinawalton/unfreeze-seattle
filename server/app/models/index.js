const dbConfig = require('../config/db.config.js');

const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize, Model);
db.seattleFacts = require('./seattleFact.model')(sequelize, Sequelize, Model);
db.interests = require('./interest.model.js')(sequelize, Sequelize, Model);
db.neighborhoods = require('./neighborhood.model')(sequelize, Sequelize, Model);
db.data = require('./preloadedData.json');

module.exports = db;