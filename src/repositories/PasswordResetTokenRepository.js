const BaseRepository = require('./base.repository');
const passwordResetTokenDAO = require('../dao/PasswordResetTokenDAO');

class PasswordResetTokenRepository extends BaseRepository {
  constructor() {
    super(passwordResetTokenDAO);
  }

  async getValidToken(token) {
    return passwordResetTokenDAO.findValidToken(token);
  }
}

module.exports = new PasswordResetTokenRepository();

