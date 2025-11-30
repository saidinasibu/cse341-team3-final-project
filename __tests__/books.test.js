const request = require('supertest');
const express = require('express');
const booksRouter = require('../routes/books');
const booksController = require('../controllers/books');

// Mock the controller
jest.mock('../controllers/books');
jest.mock('../middleware/authenticate');
jest.mock('../middleware/middleware');

const app = express();
app.use(express.json());
app.use('/books', booksRouter);

describe('Books Routes - GET', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /books', () => {
    it('should return all books with status 200', async () => {
      const mockBooks = [
        {
          _id: '507f1f77bcf86cd799439011',
          title: 'The Clockwork Archive',
          author: 'Mira Halden',
          genre: 'Fantasy',
          publishedYear: 2016,
          language: 'English',
          pages: 412,
          available: true,
          summary: 'A young archivist discovers a hidden collection...'
        },
        {
          _id: '507f1f77bcf86cd799439012',
          title: 'Another Book',
          author: 'John Doe',
          genre: 'Science Fiction',
          publishedYear: 2020,
          language: 'English',
          pages: 350,
          available: false,
          summary: 'An epic tale...'
        }
      ];

      booksController.getAll.mockImplementation((req, res) => {
        res.status(200).json(mockBooks);
      });

      const response = await request(app).get('/books');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBooks);
      expect(response.body).toHaveLength(2);
      expect(booksController.getAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting all books', async () => {
      booksController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ message: 'Internal server error' });
      });

      const response = await request(app).get('/books');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /books/:id', () => {
    it('should return a single book with status 200', async () => {
      const mockBook = {
        _id: '507f1f77bcf86cd799439011',
        title: 'The Clockwork Archive',
        author: 'Mira Halden',
        genre: 'Fantasy',
        publishedYear: 2016,
        language: 'English',
        pages: 412,
        available: true,
        summary: 'A young archivist discovers a hidden collection...'
      };

      booksController.getSingle.mockImplementation((req, res) => {
        res.status(200).json(mockBook);
      });

      const response = await request(app).get('/books/507f1f77bcf86cd799439011');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBook);
      expect(response.body).toHaveProperty('title', 'The Clockwork Archive');
      expect(booksController.getSingle).toHaveBeenCalledTimes(1);
    });

    it('should return 400 for invalid book ID', async () => {
      booksController.getSingle.mockImplementation((req, res) => {
        res.status(400).json('Must use a valid book id to find a book.');
      });

      const response = await request(app).get('/books/invalid-id');

      expect(response.status).toBe(400);
    });

    it('should handle errors when getting a single book', async () => {
      booksController.getSingle.mockImplementation((req, res) => {
        res.status(500).json({ message: 'Internal server error' });
      });

      const response = await request(app).get('/books/507f1f77bcf86cd799439011');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });
});
