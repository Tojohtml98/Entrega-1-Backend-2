const BaseRepository = require('./base.repository');
const userDAO = require('../dao/UserDAO');

class UserRepository extends BaseRepository {
  constructor() {
    super(userDAO);
  }

  async getByEmail(email) {
    return this.dao.findByEmail(email);
  }
}

module.exports = new UserRepository();

