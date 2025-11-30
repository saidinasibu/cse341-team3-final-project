// routes/stores.js
// Routes for the Stores collection.

const express = require('express');
const router = express.Router();

const controller = require('../controllers/stores');
const { saveStore } = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);

// Protected routes
router.post('/', isAuthenticated, saveStore, controller.createStore);
router.put('/:id', isAuthenticated, saveStore, controller.updateStore);
router.delete('/:id', isAuthenticated, controller.deleteStore);

module.exports = router;
