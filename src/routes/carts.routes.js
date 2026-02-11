const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');
const { authenticateCurrent, authorizeUser } = require('../middleware/auth.middleware');

// Agregar producto al carrito (solo user)
router.post('/:cid/products/:pid', authenticateCurrent, authorizeUser, cartsController.addProductToCart);

// Realizar compra del carrito (solo user)
router.post('/:cid/purchase', authenticateCurrent, authorizeUser, cartsController.purchaseCart);

module.exports = router;

