const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const validation = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);

//protected routes
router.post('/', isAuthenticated, validation.saveAuthor, authorsController.createAuthor);
router.put('/:id', isAuthenticated, validation.saveAuthor, authorsController.updateAuthor);
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;