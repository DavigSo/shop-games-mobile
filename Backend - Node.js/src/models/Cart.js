const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  games: [
    {
      game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      urlImg: {
        type: String, // Adicione um campo para a URL da imagem
      },
      name: {
        type: String, // Adicione um campo para o nome do jogo
      },
      value: {
        type: String, // Adicione um campo para o nome do jogo
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
