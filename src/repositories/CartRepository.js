const BaseRepository = require('./base.repository');
const cartDAO = require('../dao/CartDAO');

class CartRepository extends BaseRepository {
  constructor() {
    super(cartDAO);
  }
}

module.exports = new CartRepository();

