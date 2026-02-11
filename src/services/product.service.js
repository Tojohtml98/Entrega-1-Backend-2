const productRepository = require('../repositories/ProductRepository');

class ProductService {
  async createProduct(data) {
    const { title, price, stock } = data;

    if (!title || price == null || stock == null) {
      const error = new Error('Título, precio y stock son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    return productRepository.create(data);
  }

  async getProducts() {
    return productRepository.getAll();
  }

  async getProductById(id) {
    const product = await productRepository.getById(id);
    if (!product) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  async updateProduct(id, data) {
    const updated = await productRepository.update(id, data);
    if (!updated) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return updated;
  }

  async deleteProduct(id) {
    const deleted = await productRepository.delete(id);
    if (!deleted) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return deleted;
  }
}

module.exports = new ProductService();

