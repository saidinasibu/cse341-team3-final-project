const request = require('supertest');
const app = require('../server');
const { initDb } = require('../db/connect');

beforeAll((done) => {
  initDb((err) => {
    if (err) done(err);
    else done();
  });
});

describe('Authors API', () => {
  it('GET /authors - should return all authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /authors/:id - should return a single author or 404', async () => {
    const res = await request(app).get('/authors/000000000000000000000000');
    expect([200, 404]).toContain(res.statusCode);
  });
});
