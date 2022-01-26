const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync({ force: true })
    .then(() => {
        db.seattleFacts.bulkCreate(db.data.facts);
        db.interests.bulkCreate(db.data.interests);
        db.neighborhoods.bulkCreate(db.data.neighborhoods, { fields: ["name"] });
    }
);

require('./app/routes/user.routes')(app);
require('./app/routes/interest.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})