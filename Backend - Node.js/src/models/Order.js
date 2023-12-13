const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  games: [
    {
      game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
      },
      quantity: {
        type: Number,
        default: 1
      },
      value: {
        type: Number,
        required: true
      }
    }
  ],
  totalValue: {
    type: Number,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
