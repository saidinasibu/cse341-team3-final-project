const request = require('supertest');
const express = require('express');
const storesRouter = require('../routes/stores');
const storesController = require('../controllers/stores');

jest.mock('../controllers/stores');
jest.mock('../middleware/authenticate');
jest.mock('../middleware/middleware');

const app = express();
app.use(express.json());
app.use('/stores', storesRouter);

describe('Stores Routes - GET', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /stores', () => {
    it('should return all stores with status 200', async () => {
      const mockStores = [
        {
          _id: '507f1f77bcf86cd799439031',
          location: 'Downtown Crescent Market, Cape Town',
          owner: 'Liam Hart',
          employees: 12
        },
        {
          _id: '507f1f77bcf86cd799439032',
          location: 'Riverview Plaza, Johannesburg',
          owner: 'Nora Bennett',
          employees: 8
        }
      ];

      storesController.getAll.mockImplementation((req, res) => {
        res.status(200).json(mockStores);
      });

      const response = await request(app).get('/stores');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockStores);
      expect(response.body).toHaveLength(2);
      expect(storesController.getAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting all stores', async () => {
      storesController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ message: 'Internal server error' });
      });

      const response = await request(app).get('/stores');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /stores/:id', () => {
    it('should return a single store with status 200', async () => {
      const mockStore = {
        _id: '507f1f77bcf86cd799439031',
        location: 'Downtown Crescent Market, Cape Town',
        owner: 'Liam Hart',
        employees: 12
      };

      storesController.getSingle.mockImplementation((req, res) => {
        res.status(200).json(mockStore);
      });

      const response = await request(app).get('/stores/507f1f77bcf86cd799439031');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockStore);
      expect(response.body).toHaveProperty('location', 'Downtown Crescent Market, Cape Town');
      expect(storesController.getSingle).toHaveBeenCalledTimes(1);
    });

    it('should return 400 for invalid store ID', async () => {
      storesController.getSingle.mockImplementation((req, res) => {
        res.status(400).json('Must use a valid store id to find a store.');
      });

      const response = await request(app).get('/stores/invalid-id');

      expect(response.status).toBe(400);
    });

    it('should handle errors when getting a single store', async () => {
      storesController.getSingle.mockImplementation((req, res) => {
        res.status(500).json({ message: 'Internal server error' });
      });

      const response = await request(app).get('/stores/507f1f77bcf86cd799439031');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });
});
