const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./app/config/auth.config');
const multer = require('multer');
const path = require('path');

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:8081'
// };

// app.use(cors(corsOptions));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.secret));

app.use(express.static(path.join(__dirname, '../public')));

const db = require('./app/models');
// db.sequelize.sync({ force: true })
// db.sequelize.sync({ force: false })
//     .then(() => {
//         db.facts.bulkCreate(db.data.facts);
//         db.interests.bulkCreate(db.data.interests);
//         db.neighborhoods.bulkCreate(db.data.neighborhoods, { fields: ["name"] });
//     }
// );

// Keep the existing records
db.users.sync({ force: false });
db.userProfiles.sync({ force: false });

// Force drop existing records
db.facts.sync({ force: true })
    .then(() => {
        db.facts.bulkCreate(db.data.facts);
    });
db.interests.sync({ force: true })
    .then(() => {
        db.interests.bulkCreate(db.data.interests);
    })
db.neighborhoods.sync({ force: true })
    .then(() => {
        db.neighborhoods.bulkCreate(db.data.neighborhoods, { fields: ["name"] });
    })

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/main.routes')(app);
require('./app/routes/image.routes')(app);
  
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;