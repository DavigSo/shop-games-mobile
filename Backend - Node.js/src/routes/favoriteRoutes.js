const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const errorMiddleware = require('../middleware/errorMiddleware');

// Adicionar jogo aos favoritos
router.post('/favorite/add', async (req, res, next) => {
  try {
	console.log(req)
    await favoriteController.addGameToFavorites(req, res);
  } catch (error) {
    next(error); // Chama o middleware de erro
  }
});

// Remover jogo dos favoritos
router.post('/favorite/remove', async (req, res, next) => {
  try {
    await favoriteController.removeGameFromFavorites(req, res);
  } catch (error) {
    next(error); // Chama o middleware de erro
  }
});

// Listar jogos favoritos de um usuário
router.get('/list/:userId', async (req, res, next) => {
  try {
	console.log(req)
    await favoriteController.listFavoriteGames(req, res);
  } catch (error) {
    next(error); // Chama o middleware de erro
  }
});

// Middleware de erro geral
router.use(errorMiddleware);

module.exports = router;
