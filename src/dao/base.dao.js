class BaseDAO {
  constructor(model) {
    this.model = model;
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findOne(filter) {
    return this.model.findOne(filter);
  }

  async find(filter = {}) {
    return this.model.find(filter);
  }

  async create(data) {
    const doc = new this.model(data);
    return doc.save();
  }

  async updateById(id, updateData, options = { new: true }) {
    return this.model.findByIdAndUpdate(id, updateData, options);
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseDAO;

