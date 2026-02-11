const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'El stock no puede ser negativo']
  },
  category: {
    type: String,
    trim: true,
    default: 'general'
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

