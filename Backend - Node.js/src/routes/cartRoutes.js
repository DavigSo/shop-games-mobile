const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rota para adicionar um jogo ao carrinho do usuário
router.post('/cart/addToCart/', (req, res) =>
  cartController.addToCart(req, res),
);
// Rota para atualizar a quantidade de um item no carrinho
router.put('/cart/updateCartItem/:cartId/:gameId', (req, res) =>
  cartController.updateCartItem(req, res),
);

// Rota para remover um item do carrinho
router.delete('/cart/removeCartItem/:cartId/:gameId', (req, res) =>
  cartController.removeCartItem(req, res),
);

// Rota para obter detalhes do carrinho
router.get('/cart/getCartDetails/:cartId', (req, res) =>
  cartController.getCartDetails(req, res),
);

module.exports = router;
