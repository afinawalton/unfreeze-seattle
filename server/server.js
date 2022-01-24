const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
// const cors = require('cors');

const app = express();
const db = require('./app/models');
const PORT = 3000;

// const corsOptions = {
//     origin: 'http://localhost:8081'
// };

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// db.sequelize.sync();

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Unfreeze Seattle's API!" });
});

// const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})