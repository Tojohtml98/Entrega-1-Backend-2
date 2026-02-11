const cartRepository = require('../repositories/CartRepository');
const productRepository = require('../repositories/ProductRepository');
const ticketRepository = require('../repositories/TicketRepository');

class CartService {
  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      const error = new Error('Carrito no encontrado');
      error.statusCode = 404;
      throw error;
    }

    const product = await productRepository.getById(productId);
    if (!product) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }

    const existingItem = cart.products.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity
      });
    }

    await cart.save();
    return cart;
  }

  async purchaseCart(cartId, purchaserEmail) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      const error = new Error('Carrito no encontrado');
      error.statusCode = 404;
      throw error;
    }

    if (!cart.products || cart.products.length === 0) {
      const error = new Error('El carrito está vacío');
      error.statusCode = 400;
      throw error;
    }

    const productsWithDetails = [];
    const productsWithoutStock = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await productRepository.getById(item.product);
      if (!product) {
        continue;
      }

      if (product.stock >= item.quantity) {
        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;

        product.stock -= item.quantity;
        await product.save();

        productsWithDetails.push({
          product: product._id,
          quantity: item.quantity,
          subtotal
        });
      } else {
        productsWithoutStock.push({
          productId: product._id,
          title: product.title,
          requested: item.quantity,
          available: product.stock
        });
      }
    }

    if (productsWithDetails.length === 0) {
      const error = new Error('No hay stock suficiente para ninguno de los productos del carrito');
      error.statusCode = 400;
      error.productsWithoutStock = productsWithoutStock;
      throw error;
    }

    const ticketCode = `TICKET-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const ticket = await ticketRepository.create({
      code: ticketCode,
      amount: totalAmount,
      purchaser: purchaserEmail.toLowerCase(),
      products: productsWithDetails
    });

    // Filtramos el carrito para dejar solo los productos que no se pudieron comprar
    cart.products = cart.products.filter((item) => {
      const notProcessed = productsWithoutStock.find(
        (p) => p.productId.toString() === item.product.toString()
      );
      return Boolean(notProcessed);
    });

    await cart.save();

    return {
      ticket,
      productosSinStock: productsWithoutStock
    };
  }
}

module.exports = new CartService();

