const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'El monto no puede ser negativo']
  },
  purchaser: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      subtotal: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ]
}, {
  timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;

