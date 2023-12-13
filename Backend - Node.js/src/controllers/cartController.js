const Cart = require('../models/Cart');
const User = require('../models/User');

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { userId, gameId } = req.body;
      console.log('Dados recebidos:', { userId, gameId });

      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      let cart = await Cart.findById(user.cart);

      if (!cart) {
        console.log('Criando um novo carrinho para o usuário...');
        cart = await Cart.create({
          user: userId,
          games: [{ game: gameId, quantity: 1 }],
        });
        user.cart = cart._id;
        await user.save();
        console.log('Carrinho criado com sucesso:', cart);
      } else {
        cart.games = cart.games || [];

        const existingGame = cart.games.find((item) =>
          item.game.equals(gameId),
        );

        if (existingGame) {
          existingGame.quantity += 1;
          console.log(
            'Quantidade do jogo incrementada:',
            existingGame.quantity,
          );
        } else {
          cart.games.push({ game: gameId, quantity: 1 });
          console.log(
            'Jogo adicionado com sucesso:',
            cart.games[cart.games.length - 1],
          );
        }
      }

      await cart.save();
      console.log('Carrinho salvo com sucesso');
      res
        .status(200)
        .json({ message: 'Jogo adicionado ao carrinho com sucesso' });
    } catch (error) {
      console.error('Erro ao adicionar jogo ao carrinho:', error);
      res
        .status(500)
        .json({ error: 'Erro interno ao adicionar jogo ao carrinho' });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const { cartId, gameId, quantity } = req.body;

      const cart = await Cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      const gameItem = cart.games.find((item) => item.game.equals(gameId));
      if (!gameItem) {
        return res
          .status(404)
          .json({ error: 'Item do jogo não encontrado no carrinho' });
      }

      gameItem.quantity = quantity;

      await cart.save();
      res
        .status(200)
        .json({ message: 'Quantidade do item do jogo atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar item do jogo no carrinho:', error);
      res
        .status(500)
        .json({ error: 'Erro interno ao atualizar item do jogo no carrinho' });
    }
  },

  removeCartItem: async (req, res) => {
    try {
      const { cartId, gameId } = req.params; // Mude de req.body para req.params

      const cart = await Cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      const initialLength = cart.games.length;
      cart.games = cart.games.filter((item) => !item.game.equals(gameId));

      if (cart.games.length === initialLength) {
        return res
          .status(404)
          .json({ error: 'Item do jogo não encontrado no carrinho' });
      }

      await cart.save();
      res
        .status(200)
        .json({ message: 'Item do jogo removido do carrinho com sucesso' });
    } catch (error) {
      console.error('Erro ao remover item do jogo do carrinho:', error);
      res
        .status(500)
        .json({ error: 'Erro interno ao remover item do jogo do carrinho' });
    }
  },
  getCartDetails: async (req, res) => {
    try {
      const { cartId } = req.params;

      const cart = await Cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      const cartDetails = {
        user: cart.user,
        games: cart.games.map((item) => ({
          gameId: item.game,
          quantity: item.quantity,
        })),
      };

      res.status(200).json(cartDetails);
    } catch (error) {
      console.error('Erro ao obter detalhes do carrinho:', error);
      res
        .status(500)
        .json({ error: 'Erro interno ao obter detalhes do carrinho' });
    }
  },
};

module.exports = cartController;
