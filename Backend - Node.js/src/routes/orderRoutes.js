// No arquivo 'routes/orderRoutes.js'
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const mongoose = require('mongoose'); // Adicione esta linha
// Rota para finalizar um pedido
router.post('/order/finalizeCurrentOrder/', async (req, res) =>
  orderController.finalizeCurrentOrder(req, res),
);

// Rota para obter detalhes de um pedido específico
router.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params;

  // Verificar se o ID do pedido é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ error: 'ID do pedido inválido.' });
  }

  try {
    const orderDetails = await orderController.getOrderDetails(orderId);

    // Verificar se o pedido foi encontrado
    if (!orderDetails) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os pedidos de um usuário
router.get('/orders/user/:userId', async (req, res) => {
  const { userId } = req.params;

  // Verificar se o ID do usuário é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'ID do usuário inválido.' });
  }

  try {
    const userOrders = await orderController.listUserOrders(userId);

    // Verificar se o usuário tem pedidos
    if (!userOrders || userOrders.length === 0) {
      return res
        .status(404)
        .json({ error: 'Nenhum pedido encontrado para este usuário.' });
    }

    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
