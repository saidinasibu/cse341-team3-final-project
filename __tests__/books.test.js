const request = require('supertest');
const app = require('../server');
const { initDb } = require('../db/connect');

beforeAll((done) => {
  initDb((err) => {
    if (err) done(err);
    else done();
  });
});

describe('Books API', () => {
  it('GET /books - should return all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /books/:id - should return a single book or 404', async () => {
    const res = await request(app).get('/books/000000000000000000000000');
    expect([200, 404]).toContain(res.statusCode);
  });
});
