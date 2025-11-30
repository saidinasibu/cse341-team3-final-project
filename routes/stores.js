const express = require('express');
const router = express.Router();
const storesController = require('../controllers/stores');
const validation = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', storesController.getAll);
router.get('/:id', storesController.getSingle);

//protected routes
router.post('/', isAuthenticated, validation.saveStore, storesController.createStore);
router.put('/:id', isAuthenticated, validation.saveStore, storesController.updateStore);
router.delete('/:id', isAuthenticated, storesController.deleteStore);

module.exports = router;