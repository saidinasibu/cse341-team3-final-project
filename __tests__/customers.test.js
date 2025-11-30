const request = require('supertest');
const express = require('express');
const customersRouter = require('../routes/customers');
const customersController = require('../controllers/customers');

jest.mock('../controllers/customers');
jest.mock('../middleware/authenticate');
jest.mock('../middleware/middleware');

const app = express();
app.use(express.json());
app.use('/customers', customersRouter);

describe('Customers Routes - GET', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /customers', () => {
    it('should return all customers with status 200', async () => {
      const mockCustomers = [
        {
          _id: '507f1f77bcf86cd799439041',
          fullName: 'Ava Montgomery',
          address: '14 Willow Bend Street, Cape Town',
          email: 'ava.montgomery@example.com',
          phoneNumber: '+27 63 458 1290'
        },
        {
          _id: '507f1f77bcf86cd799439042',
          fullName: 'Daniel Khoza',
          address: '221 Palm Ridge Avenue, Johannesburg',
          email: 'daniel.khoza@example.com',
          phoneNumber: '+27 72 914 3301'
        }
      ];

      customersController.getAll.mockImplementation((req, res) => {
        res.status(200).json(mockCustomers);
      });

      const response = await request(app).get('/customers');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCustomers);
      expect(response.body).toHaveLength(2);
      expect(customersController.getAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting all customers', async () => {
      customersController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ message: 'Internal server error' });
      });

      const response = await request(app).get('/customers');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /customers/:id', () => {
    it('should return a single customer with status 200', async () => {
      const mockCustomer = {
        _id: '507f1f77bcf86cd799439041',
        fullName: 'Ava Montgomery',
        address: '14 Willow Bend Street, Cape Town',
        email: 'ava.montgomery@example.com',
        phoneNumber: '+27 63 458 1290'
      };

      customersController.getSingle.mockImplementation((req, res) => {
        res.status(200).json(mockCustomer);
      });

      const response = await request(app).get('/customers/507f1f77bcf86cd799439041');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCustomer);
      expect(response.body).toHaveProperty('fullName', 'Ava Montgomery');
      expect(customersController.getSingle).toHaveBeenCalledTimes(1);
    });

    it('should return 400 for invalid customer ID', async () => {
      customersController.getSingle.mockImplementation((req, res) => {
        res.status(400).json('Must use a valid customer id to find a customer.');
      });

      const response = await request(app).get('/customers/invalid-id');

      expect(response.status).toBe(400);
    });

    it('should handle errors when getting a single customer', async () => {
      customersController.getSingle.mockImplementation((req, res) => {
        res.status(500).json({ message: 'Internal server error' });
      });

      const response = await request(app).get('/customers/507f1f77bcf86cd799439041');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });
});
