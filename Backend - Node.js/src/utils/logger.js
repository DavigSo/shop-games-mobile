const winston = require('winston');

// Criação e configuração do logger usando a biblioteca Winston
const logger = winston.createLogger({
  level: 'error', // Nível mínimo de log definido como 'error'
  format: winston.format.json(), // Formato de saída configurado como JSON
  transports: [
    // Adiciona transportes (destinos) para os logs, por exemplo, um arquivo de log
    new winston.transports.Console() // Configura um transporte para log no console
  ]
});

// Exporta o logger para que possa ser utilizado em outros módulos
module.exports = logger;
