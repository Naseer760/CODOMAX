
const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../app');

// Test 1: API root endpoint
test('GET / should return API status', async () => {
    const response = await request(app)
        .get('/')
        .set('Accept', 'application/json');

    assert.equal(response.status, 200);
    assert.equal(
        response.body.service,
        'Campus Lost & Found Portal API'
    );
    assert.equal(response.body.status, 'online');
});

// Test 2: API landing endpoint
test('GET /api should return API information', async () => {
    const response = await request(app)
        .get('/api')
        .set('Accept', 'application/json');

    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'online');
    assert.ok(response.body.endpoints);
});

// Test 3: Health check endpoint
test('GET /api/health should return healthy status', async () => {
    const response = await request(app)
        .get('/api/health');

    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'healthy');
    assert.equal(
        response.body.service,
        'Campus Lost & Found Portal API'
    );
    assert.ok(response.body.timestamp);
});

// Test 4: Invalid endpoint
test('Invalid API route should return 404', async () => {
    const response = await request(app)
        .get('/api/invalid-test-route');

    assert.equal(response.status, 404);
});
