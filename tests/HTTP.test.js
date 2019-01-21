let request = require('supertest');
let app = require('../server.js');


/**
 * Test a root URL
 */
describe('Test the root path accesable', () => {
    test('It should response with success code', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

/**
 * Test a post request with params return ERROR
 */
describe('Test error', ()=> {
    test('It shoud resposnse with error HTML', (done) => {
        request(app)
        .post('/')
        .send({ city: 'Berlin'})
        .expect('Content-Type', /html/)
        .then(response => {
            expect(response.type).toEqual("text/html");
            expect(response.text).toMatch("<p>Error, please try again</p>");
            done()
        })
    });
});

/**
 * Test a post request with params is success.
 */
describe('Test POST with city', () => {
    test('It should resposnse with success HTML', (done) => {
       request(app)
        .post('/')
        .send({ city: 'Berlin'})
        .expect('Content-Type', /html/)
        .then(response => {
            expect(response.type).toEqual("text/html");
            expect(response.text).toMatch("degrees in Berlin");
            done()
        })
    });
    app.close(); // close app to prevent error of Jest not exiting after test completed
});

