const assert = require('assert').strict;
const app = require('../server/server.js');
// const users = require('../server/app/routes/user.routes')(app);
// const users = require('../server/app/controllers/user.controller.js');
const request = require('supertest')(app);

describe('User Handlers', () => {
    afterAll(done => {
        app.close();
        done();
    })
    test('gets all "local" users', (done) => {
        request.get(`/users`)
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, []);
                done();
            });
    });
})

// describe('User Handlers', () => {
//     test('gets all "local" users', () => {
//         const req = { query: {
//             residentType: 'local'
//         } };
//         const res = {
//             text: '',
//             send: function(data) { return data }
//         };
//         users.getUsersByResidency(req, res);

//         expect(res.send).toEqual([]);
//     });
// })