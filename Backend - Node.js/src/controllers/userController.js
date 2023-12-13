const User = require('../models/User');
const Cart = require('../models/Cart');
const generateToken = require('../utils/generateToken');

const userController = {
  // Criação de um novo usuário
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the user already exists
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json('Usuário já existe!!');
      }

      // Cria um novo usuário
      console.log('Criando um novo usuário...');
      const newUser = new User({ username, email, password });

      // Salva o usuário no banco de dados
      console.log('Salvando o usuário no banco de dados...');
      const savedUser = await newUser.save();

      // Cria um carrinho associado ao novo usuário
      console.log('Criando um novo carrinho...');
      const newCart = new Cart({ user: savedUser._id });
      const savedCart = await newCart.save();

      // Atualiza o campo 'cart' no usuário com a referência para o carrinho criado
      console.log('Atualizando o campo "cart" no usuário...');
      savedUser.cart = savedCart._id;
      await savedUser.save();

      // Mensagem de confirmação no console
      console.log('Usuário registrado com sucesso:', savedUser);

      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Erro ao registrar um novo usuário:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      if (await user.matchPassword(password)) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    } catch (error) {
      console.error('Erro ao efetuar login:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obtenção de todos os usuários
  getAll: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (error) {
      console.error('Erro ao recuperar todos os usuários:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obtenção de um usuário por ID
  getById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao recuperar um único usuário:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Exclusão de um usuário por ID
  deleteById: async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json(deletedUser);
    } catch (error) {
      console.error('Erro ao excluir um usuário:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Atualização de um usuário por ID
  updateById: async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true },
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar um usuário:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
  getUserInfoById: async (req, res) => {
    try {
      const userId = req.params.id;

      // Use populate to get complete user information, including the cart details
      const user = await User.findById(userId).populate('cart');

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(
        'Erro ao recuperar informações completas do usuário:',
        error.message,
      );
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
  getCartIdByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      console.log('Username:', username);
      // Buscar o usuário pelo nome de usuário
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Retornar o ID do carrinho associado ao usuário
      res.status(200).json({ cartId: user.cart });
    } catch (error) {
      console.error(
        'Erro ao obter o ID do carrinho do usuário:',
        error.message,
      );
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  updateImage: async (userId, imageUrl) => {
    try {
      // Verifica se o usuário existe
      const user = await User.findById(userId);
  
      if (!user) {
        console.error('Usuário não encontrado.');
        return { success: false, error: 'Usuário não encontrado.' };
      }
  
      // Atualiza o campo de imagem do usuário
      user.image = imageUrl;
  
      // Salva as alterações no banco de dados
      await user.save();
  
      console.log('Imagem do usuário atualizada com sucesso.');
      return { success: true, message: 'Imagem do usuário atualizada com sucesso.' };
    } catch (error) {
      console.error('Erro ao atualizar a imagem do usuário:', error);
      return { success: false, error: 'Erro ao atualizar a imagem do usuário.' };
    }
  },
  getImage: async (userId) => {
    try {
      // Verifica se o usuário existe
      const user = await User.findById(userId);
  
      if (!user) {
        console.error('Usuário não encontrado.');
        return { success: false, error: 'Usuário não encontrado.' };
      }
  
      // Obtém o URL da imagem do usuário
      const imageUrl = user.image;
  
      console.log('Imagem do usuário obtida com sucesso.');
      return { success: true, imageUrl };
    } catch (error) {
      console.error('Erro ao obter a imagem do usuário:', error);
      return { success: false, error: 'Erro ao obter a imagem do usuário.' };
    }
  }
};

module.exports = userController;
