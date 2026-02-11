const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { authenticateCurrent, authorizeAdmin } = require('../middleware/auth.middleware');

// Listar productos (público)
router.get('/', productsController.getProducts);

// Obtener producto por id (público)
router.get('/:id', productsController.getProductById);

// Crear producto (solo admin)
router.post('/', authenticateCurrent, authorizeAdmin, productsController.createProduct);

// Actualizar producto (solo admin)
router.put('/:id', authenticateCurrent, authorizeAdmin, productsController.updateProduct);

// Eliminar producto (solo admin)
router.delete('/:id', authenticateCurrent, authorizeAdmin, productsController.deleteProduct);

module.exports = router;

