const Game  = require('../models/Game');

const gameController = {
  create: async (req, res) => {
    try {
      // Extrair os dados do corpo da requisição
      const { cod, item, amount, value, urlImg } = req.body;

      // Criar uma nova instância do modelo Game
      const newGame = new Game({
        cod,
        item,
        amount,
        value,
        urlImg
      });

      // Salvar o novo jogo no banco de dados
      const savedGame = await newGame.save();

      // Responder com o jogo recém-criado
      res.status(201).json(savedGame);
    } catch (error) {
      console.error('Erro ao criar um novo jogo:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  getAll: async (req, res) => {
    try {
      // Consultar todos os jogos no banco de dados
      const allGames = await Game.find();

      // Responder com a lista de jogos
      res.status(200).json(allGames);
    } catch (error) {
      console.error('Erro ao recuperar todos os jogos:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  getById: async (req, res) => {
    try {
      // Obter o ID do parâmetro da URL
      const gameId = req.params.id;

      // Consultar o jogo no banco de dados pelo ID
      const game = await Game.findById(gameId);

      // Verificar se o jogo foi encontrado
      if (!game) {
        return res.status(404).json({ error: 'Jogo não encontrado' });
      }

      // Responder com o jogo encontrado
      res.status(200).json(game);
    } catch (error) {
      console.error('Erro ao recuperar um único jogo:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  deleteById: async (req, res) => {
    try {
      // Obter o ID do parâmetro da URL
      const gameId = req.params.id;

      // Excluir o jogo do banco de dados pelo ID
      const deletedGame = await Game.findByIdAndDelete(gameId);

      // Verificar se o jogo foi encontrado e excluído
      if (!deletedGame) {
        return res.status(404).json({ error: 'Jogo não encontrado' });
      }

      // Responder com o jogo excluído
      res.status(200).json(deletedGame);
    } catch (error) {
      console.error('Erro ao excluir um jogo:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  updateById: async (req, res) => {
    try {
      // Obter o ID do parâmetro da URL
      const gameId = req.params.id;

      // Extrair os dados do corpo da requisição
      const { cod, item, amount, value, urlImg } = req.body;

      // Atualizar o jogo no banco de dados pelo ID
      const updatedGame = await Game.findByIdAndUpdate(
        gameId,
        {
          cod,
          item,
          amount,
          value,
          urlImg
        },
        { new: true } // Retorna a versão atualizada do documento
      );

      // Verificar se o jogo foi encontrado e atualizado
      if (!updatedGame) {
        return res.status(404).json({ error: 'Jogo não encontrado' });
      }

      // Responder com o jogo atualizado
      res.status(200).json(updatedGame);
    } catch (error) {
      console.error('Erro ao atualizar um jogo:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

module.exports = gameController;
