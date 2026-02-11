const BaseDAO = require('./base.dao');
const User = require('../models/User');

class UserDAO extends BaseDAO {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.model.findOne({ email: email.toLowerCase() });
  }
}

module.exports = new UserDAO();

