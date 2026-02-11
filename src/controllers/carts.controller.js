const cartService = require('../services/cart.service');

// Solo usuario: agregar producto a su carrito
const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = Number(req.body.quantity) || 1;

    // Verificamos que el carrito pertenezca al usuario autenticado
    if (!req.user || !req.user.cart || req.user.cart.toString() !== cid.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'No puedes modificar un carrito que no te pertenece'
      });
    }

    const cart = await cartService.addProductToCart(cid, pid, quantity);

    res.json({
      status: 'success',
      cart
    });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al agregar producto al carrito'
    });
  }
};

// Solo usuario: realizar compra del carrito
const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;

    if (!req.user || !req.user.cart || req.user.cart.toString() !== cid.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'No puedes comprar un carrito que no te pertenece'
      });
    }

    const result = await cartService.purchaseCart(cid, req.user.email);

    res.json({
      status: 'success',
      message: 'Compra procesada',
      ticket: result.ticket,
      productosSinStock: result.productosSinStock
    });
  } catch (error) {
    console.error('Error al realizar la compra:', error);

    // Si viene info de productos sin stock, la incluimos
    const response = {
      status: 'error',
      message: error.message || 'Error al realizar la compra'
    };

    if (error.productsWithoutStock) {
      response.productosSinStock = error.productsWithoutStock;
    }

    res.status(error.statusCode || 500).json(response);
  }
};

module.exports = {
  addProductToCart,
  purchaseCart
};

