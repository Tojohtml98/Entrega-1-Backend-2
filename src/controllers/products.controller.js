const productService = require('../services/product.service');

// Solo admin: crear producto
const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      status: 'success',
      product
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al crear producto'
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json({
      status: 'success',
      products
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener productos'
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({
      status: 'success',
      product
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al obtener producto'
    });
  }
};

// Solo admin: actualizar producto
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json({
      status: 'success',
      product
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al actualizar producto'
    });
  }
};

// Solo admin: eliminar producto
const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({
      status: 'success',
      message: 'Producto eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al eliminar producto'
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};

