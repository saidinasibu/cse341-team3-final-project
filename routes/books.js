const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validation = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

//protected routes
router.post('/', isAuthenticated, validation.saveBook, booksController.createBook);
router.put('/:id', isAuthenticated, validation.saveBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;