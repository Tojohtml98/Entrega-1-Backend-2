const BaseRepository = require('./base.repository');
const productDAO = require('../dao/ProductDAO');

class ProductRepository extends BaseRepository {
  constructor() {
    super(productDAO);
  }
}

module.exports = new ProductRepository();

