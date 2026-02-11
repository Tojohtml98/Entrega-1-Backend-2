class BaseRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getById(id) {
    return this.dao.findById(id);
  }

  async getOne(filter) {
    return this.dao.findOne(filter);
  }

  async getAll(filter = {}) {
    return this.dao.find(filter);
  }

  async create(data) {
    return this.dao.create(data);
  }

  async update(id, data) {
    return this.dao.updateById(id, data);
  }

  async delete(id) {
    return this.dao.deleteById(id);
  }
}

module.exports = BaseRepository;

