const BaseDAO = require('./base.dao');
const Ticket = require('../models/Ticket');

class TicketDAO extends BaseDAO {
  constructor() {
    super(Ticket);
  }
}

module.exports = new TicketDAO();

