const BaseRepository = require('./base.repository');
const ticketDAO = require('../dao/TicketDAO');

class TicketRepository extends BaseRepository {
  constructor() {
    super(ticketDAO);
  }
}

module.exports = new TicketRepository();

