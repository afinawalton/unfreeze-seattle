const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize, Model).User;
db.userProfiles = require('./user.model.js')(sequelize, Sequelize, Model).UserProfile;
db.facts = require('./fact.model')(sequelize, Sequelize, Model);
db.interests = require('./interest.model.js')(sequelize, Sequelize, Model);
db.neighborhoods = require('./neighborhood.model')(sequelize, Sequelize, Model);
db.data = require('./preloadedData.json');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;