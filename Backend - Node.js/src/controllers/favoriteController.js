const Favorite = require('../models/Favorite');

// Controlador de Favoritos
const favoriteController = {
  // Adicionar jogo aos favoritos
  addGameToFavorites: async (req, res) => {
    try {
      const { userId, gameId } = req.body;
      // Verifica se o usuário já tem uma lista de favoritos
      const favorite = await Favorite.findOne({ user: userId });

      if (!favorite) {
        // Se o favorito ainda não existir, cria um novo
        const newFavorite = await Favorite.create({
          user: userId,
          games: [gameId]
        });
        res.json(newFavorite);
      } else {
        // Se o favorito já existir, adiciona o jogo à lista
        favorite.games.push(gameId);
        await favorite.save();
        res.json(favorite);
      }
    } catch (error) {
      console.error('Error adding game to favorites:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Remover jogo dos favoritos
  removeGameFromFavorites: async (req, res) => {
    try {
      const { userId, gameId } = req.body;

      // Encontra a lista de favoritos do usuário
      const favorite = await Favorite.findOne({ user: userId });

      if (favorite) {
        // Remove o jogo da lista de favoritos
        favorite.games = favorite.games.filter(game => game.toString() !== gameId);
        await favorite.save();
      }

      res.json({ message: 'Game removed from favorites' });
    } catch (error) {
      console.error('Error removing game from favorites:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Listar jogos favoritos de um usuário
  listFavoriteGames: async (req, res) => {
    try {
      const { userId } = req.params;
//console.log('apagar depois', req.params.userId)
      // Encontra a lista de favoritos do usuário e popula os jogos associados
      const favorite = await Favorite.findOne({ user: userId }).populate('games');

      if (!favorite) {
        res.json({ games: [] });
      } else {
        res.json({ games: favorite.games });
      }
    } catch (error) {
      console.error('Error listing favorite games:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = favoriteController;
