const { verifySignUp } = require('../middleware');
const auth = require('../controllers/auth.controller');
const { router } = require('../../server');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', `${req.protocol}://${req.hostname}:3000`);
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/user', auth.checkUser);

    app.post(
        '/auth/signup',
        [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        auth.signUpUser
    );

    app.post('/auth/login', auth.logInUser);

    app.get('/auth/logout', auth.logoutUser);

    // app.use('/auth', router);
};