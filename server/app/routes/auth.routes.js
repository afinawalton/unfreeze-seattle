const { verifySignUp } = require('../middleware');
const auth = require('../controllers/auth.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post(
        '/auth/signup',
        [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        auth.signUpUser
    );

    app.post('/auth/login', auth.logInUser);

    app.delete('/auth/logout', function (req, res) {
        res.status(200).send('User succesfully logged out!')
      })
};