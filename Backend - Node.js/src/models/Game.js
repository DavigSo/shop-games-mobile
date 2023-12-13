const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    cod: { type: Number, required: true, unique: true },
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    value: { type: Number, required: true },
    urlImg: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
