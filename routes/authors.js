// routes/authors.js
// Routes for the Authors collection.

const express = require('express');
const router = express.Router();

const controller = require('../controllers/authors');
const { saveAuthor } = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);

// Protected routes
router.post('/', isAuthenticated, saveAuthor, controller.createAuthor);
router.put('/:id', isAuthenticated, saveAuthor, controller.updateAuthor);
router.delete('/:id', isAuthenticated, controller.deleteAuthor);

module.exports = router;
