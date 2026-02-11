const BaseDAO = require('./base.dao');
const Product = require('../models/Product');

class ProductDAO extends BaseDAO {
  constructor() {
    super(Product);
  }
}

module.exports = new ProductDAO();

