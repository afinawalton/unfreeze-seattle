module.exports = app => {
    const users = require('../controllers/user.controller.js');

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', `${req.protocol}://${req.hostname}:3000`);
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post(
        '/api/users/:id/profile',
        users.updateUserProfile
    );

    app.get('/api/users/:id', users.getOneUser);

    app.get('/api/users', users.getUsersByResidency);

    app.delete('/api/users/:id', users.deleteUser);
}