// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { celebrate, Joi, errors } = require('celebrate'); // Adicione esta linha para utilizar o Celebrate
const errorMiddleware = require('../middleware/errorMiddleware'); // Substitua pelo caminho correto

// Rota para criar um novo usuário com validação Celebrate
router.post(
  '/users',
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  userController.register,
);

router.post('/updateImage/:userId', async (req, res) => {
  const userId = req.params.userId;
  const imageUrl = req.body.imageUrl; // Certifique-se de que o corpo da solicitação contém uma propriedade 'imageUrl'

  const result = await userController.updateImage(userId, imageUrl);

  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(404).json({ error: result.error });
  }
});

// Rota para efetuar login
router.post('/login', userController.login);

// Rota para obter todos os usuários
router.get('/users', userController.getAll);
router.get('/users/getUserImage/:userId', async (req, res) => {
  const userId = req.params.userId;
  const result = await userController.getImage(userId);

  if (result.success) {
    res.json({ imageUrl: result.imageUrl });
  } else {
    res.status(404).json({ error: result.error });
  }
});

// Rota para obter um único usuário por ID
router.get('/users/:id', userController.getById);

// Rota para excluir um usuário por ID
router.delete('/users/:id', userController.deleteById);

// Rota para atualizar um usuário por ID com validação Celebrate
router.put(
  '/users/:id',

  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }),
  userController.updateById,
);

router.get('/users/:id/info', userController.getUserInfoById);

router.get('/users/cartId/:username', userController.getCartIdByUsername);

// Middleware para lidar com erros de validação Celebrate
router.use(errors());

// Middleware para lidar com outros erros
router.use(errorMiddleware);

module.exports = router;
