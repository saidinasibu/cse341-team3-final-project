const request = require('supertest');
const app = require('../server');

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
