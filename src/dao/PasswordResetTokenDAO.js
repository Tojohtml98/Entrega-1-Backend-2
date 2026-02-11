const BaseDAO = require('./base.dao');
const PasswordResetToken = require('../models/PasswordResetToken');

class PasswordResetTokenDAO extends BaseDAO {
  constructor() {
    super(PasswordResetToken);
  }

  async findValidToken(token) {
    const now = new Date();
    return this.model.findOne({
      token,
      used: false,
      expiresAt: { $gt: now }
    });
  }
}

module.exports = new PasswordResetTokenDAO();

