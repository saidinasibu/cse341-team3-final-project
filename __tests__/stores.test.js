const request = require('supertest');
const app = require('../server');

describe('Stores API', () => {
  it('GET /stores - should return all stores', async () => {
    const res = await request(app).get('/stores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /stores/:id - should return a store or 404', async () => {
    const res = await request(app).get('/stores/000000000000000000000000');
    expect([200, 404]).toContain(res.statusCode);
  });
});
