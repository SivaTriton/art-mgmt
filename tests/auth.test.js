const request = require('supertest');
const app = require('../server'); // Ensure your server is exported from server.js
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Auth Endpoints', () => {
    it('should register a new employee', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Sivabalan',
                email: 'siva@yop.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Employee registered');
    });

    it('should login an employee', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'si@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
