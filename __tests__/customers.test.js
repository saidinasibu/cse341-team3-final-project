const request = require('supertest');
const app = require('../server');

describe('Customers API', () => {
  it('GET /customers - should return all customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /customers/:id - should return a customer or 404', async () => {
    const res = await request(app).get('/customers/000000000000000000000000');
    expect([200, 404]).toContain(res.statusCode);
  });
});
