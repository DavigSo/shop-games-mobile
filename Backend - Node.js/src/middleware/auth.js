const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rotas autenticadas
const protect = async (req, res, next) => {
  let token;

  // Verificar se há um token no cabeçalho de autorização
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrair o token da string do cabeçalho
      token = req.headers.authorization.split(' ')[1];

      // Verificar se o token é válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Encontrar o usuário associado ao ID do token (decodificado)
      req.user = await User.findById(decoded.id).select('-password');

      // Verificar se o ID do usuário no token corresponde ao ID da rota
      if (decoded.id == req.params.id) {
        // Se corresponder, permitir acesso à rota protegida
        next();
      } else {
        res.status(401).json('Não autorizado, Token inválido');
      }
    } catch (error) {
      // Se houver um erro na verificação do token
      res.status(401).json('Não autorizado, Token inválido');
    }
  } else {
    // Se não houver token no cabeçalho de autorização
    res.status(401).json('Não autorizado, Token ausente');
  }
};

module.exports = protect;
