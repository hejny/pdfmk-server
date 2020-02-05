import request from 'supertest';
import { createApp } from '../src/app';
const { version } = require('../package.json');

const { app, server } = createApp();

export default describe('User Profile route', () => {
    test('About route', () =>
        request(app)
            .get(`/about`)
            .expect((response) => {
                if (response.body.version !== version) {
                    throw new Error(`Expected version "${version}" not "${response.body.version}" in about route.`);
                }
            }));

    afterAll((done) => {
        console.info(`Closing server after test.`);
        server.close(done);
    });
});
