const jwt = require('jsonwebtoken');

// Função para gerar um token JWT com base no ID fornecido
const generateToken = id => {
  // Utiliza o método sign do jwt para criar o token
  // O token inclui o ID, é assinado usando a chave secreta definida no arquivo de ambiente e tem um tempo de expiração de 30 dias
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Exporta a função para que ela possa ser utilizada em outros arquivos
module.exports = generateToken;
