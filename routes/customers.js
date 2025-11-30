const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');
const validation = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', customersController.getAll);
router.get('/:id', customersController.getSingle);

//protected routes
router.post('/', isAuthenticated, validation.saveCustomer, customersController.createCustomer);
router.put('/:id', isAuthenticated, validation.saveCustomer, customersController.updateCustomer);
router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;