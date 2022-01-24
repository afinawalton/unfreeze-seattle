const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Unfreeze Seattle's API!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})