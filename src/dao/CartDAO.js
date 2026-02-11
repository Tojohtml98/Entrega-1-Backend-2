const BaseDAO = require('./base.dao');
const Cart = require('../models/Cart');

class CartDAO extends BaseDAO {
  constructor() {
    super(Cart);
  }
}

module.exports = new CartDAO();

