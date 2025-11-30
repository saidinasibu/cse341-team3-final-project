const request = require('supertest');
const express = require('express');
const authorsRouter = require('../routes/authors');
const authorsController = require('../controllers/authors');

jest.mock('../controllers/authors');
jest.mock('../middleware/authenticate');
jest.mock('../middleware/middleware');

const app = express();
app.use(express.json());
app.use('/authors', authorsRouter);

describe('Authors Routes - GET', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /authors', () => {
    it('should return all authors with status 200', async () => {
      const mockAuthors = [
        {
          _id: '507f1f77bcf86cd799439021',
          name: 'Mira Halden',
          birthYear: 1984,
          nationality: 'British',
          awards: ['Hugo Award', 'Nebula Award'],
          numBooksWritten: 7
        },
        {
          _id: '507f1f77bcf86cd799439022',
          name: 'John Doe',
          birthYear: 1975,
          nationality: 'American',
          awards: ['Pulitzer Prize'],
          numBooksWritten: 12
        }
      ];

      authorsController.getAll.mockImplementation((req, res) => {
        res.status(200).json(mockAuthors);
      });

      const response = await request(app).get('/authors');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAuthors);
      expect(response.body).toHaveLength(2);
      expect(authorsController.getAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting all authors', async () => {
      authorsController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ message: 'Internal server error' });
      });

      const response = await request(app).get('/authors');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /authors/:id', () => {
    it('should return a single author with status 200', async () => {
      const mockAuthor = {
        _id: '507f1f77bcf86cd799439021',
        name: 'Mira Halden',
        birthYear: 1984,
        nationality: 'British',
        awards: ['Hugo Award', 'Nebula Award'],
        numBooksWritten: 7
      };

      authorsController.getSingle.mockImplementation((req, res) => {
        res.status(200).json(mockAuthor);
      });

      const response = await request(app).get('/authors/507f1f77bcf86cd799439021');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAuthor);
      expect(response.body).toHaveProperty('name', 'Mira Halden');
      expect(authorsController.getSingle).toHaveBeenCalledTimes(1);
    });

    it('should return 400 for invalid author ID', async () => {
      authorsController.getSingle.mockImplementation((req, res) => {
        res.status(400).json('Must use a valid author id to find an author.');
      });

      const response = await request(app).get('/authors/invalid-id');

      expect(response.status).toBe(400);
    });

    it('should handle errors when getting a single author', async () => {
      authorsController.getSingle.mockImplementation((req, res) => {
        res.status(500).json({ message: 'Internal server error' });
      });

      const response = await request(app).get('/authors/507f1f77bcf86cd799439021');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });
});
