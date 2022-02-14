const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const config = require('./server/app/config/auth.config');
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

app.use(cookieParser(process.env.CONFIG_SECRET));

// app.use(express.static(path.join(__dirname, '../client/public')));

const db = require('./server/app/models');
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
        db.neighborhoods.bulkCreate(db.data.neighborhoods);
    })

require('./server/app/routes/auth.routes')(app);
require('./server/app/routes/user.routes')(app);
require('./server/app/routes/main.routes')(app);
require('./server/app/routes/image.routes')(app);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, './client/build', 'index.html'));
// })

app.use(express.static(path.join(__dirname, './client/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
})
  
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;