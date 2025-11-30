// routes/books.js
// Routes for the Books collection.

const express = require('express');
const router = express.Router();

const controller = require('../controllers/books');
const { saveBook } = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);

// Protected routes
router.post('/', saveBook, controller.createBook);
router.put('/:id', saveBook, controller.updateBook);
router.delete('/:id', controller.deleteBook);

module.exports = router;
