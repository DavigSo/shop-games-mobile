const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rota para criar um novo jogo
router.post('/games', (req, res) => gameController.create(req, res));

// Rota para obter todos os jogos
router.get('/games', (req, res) => gameController.getAll(req, res));

// Rota para obter um único jogo por ID
router.get('/games/:id', (req, res) => gameController.getById(req, res));

// Rota para excluir um jogo por ID
router.delete('/games/:id', (req, res) => gameController.deleteById(req, res));

// Rota para atualizar um jogo por ID
router.put('/games/:id', (req, res) => gameController.updateById(req, res));

module.exports = router;
