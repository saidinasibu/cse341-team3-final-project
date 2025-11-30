// routes/customers.js
// Routes for the Customers collection.

const express = require('express');
const router = express.Router();

const controller = require('../controllers/customers');
const { saveCustomer } = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);

// Protected routes
router.post('/', isAuthenticated, saveCustomer, controller.createCustomer);
router.put('/:id', isAuthenticated, saveCustomer, controller.updateCustomer);
router.delete('/:id', isAuthenticated, controller.deleteCustomer);

module.exports = router;
