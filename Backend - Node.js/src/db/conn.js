const mongoose = require('mongoose');

// Função principal para conectar ao banco de dados MongoDB
async function main() {
  try {
    // Configuração para garantir que as consultas sigam o modo estrito
    mongoose.set('strictQuery', true);

    // Conectar ao banco de dados usando a URI fornecida no arquivo de ambiente (env)
    await mongoose.connect(process.env.MONGO_URI);

    // Se a conexão for bem-sucedida, exibir mensagem no console
    console.log('Conectado ao banco');
  } catch (error) {
    // Se ocorrer um erro durante a conexão, exibir mensagem de erro no console
    console.log(`Erro: ${error}`);
  }
}

// Exportar a função para que ela possa ser utilizada em outros lugares
module.exports = main;
