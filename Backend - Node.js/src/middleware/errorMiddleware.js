const { ValidationError } = require('mongoose');
const ZodError = require('zod');
const { isCelebrateError } = require('celebrate');
const logger = require('../utils/logger'); // Substitua pelo caminho correto

function errorMiddleware(err, req, res, next) {
  try {
    // Log do erro original
    console.error('Original Error:', err);

    // Se o erro for uma instância de ValidationError (Mongoose),
    // trata o erro como uma validação falha e responde com status 422.
    if (err instanceof ValidationError) {
      logger.error(`ValidationError: ${err.message}`);
      return res.status(422).json({ error: err.message });
    }

    // Se o erro for uma instância de ZodError,
    // trata o erro de validação com status 422 e responde com os erros detalhados.
    if (err instanceof ZodError) {
      logger.error(`ZodError: ${err.errors}`);
      return res.status(422).json({ error: err.errors });
    }

    // Se o erro for um erro de validação Celebrate,
    // converte os detalhes do erro em um formato específico e responde com status 422.
    if (isCelebrateError(err)) {
      const errorMessages = Array.from(err.details, ([key, value]) => ({
        key,
        message: value.message
      }));
      logger.error(`CelebrateError: ${JSON.stringify(errorMessages)}`);
      return res.status(422).json({ error: errorMessages });
    }

    // Se o erro não for de nenhum tipo específico acima,
    // registra o erro no console e responde com status 500 (Erro Interno do Servidor).
    logger.error(`Erro na solicitação: ${err.stack}`);
    return res.status(500).json({
      error: 'Erro interno do servidor'
    });
  } catch (error) {
    // Log de erro para diagnosticar o problema
    logger.error(`Error in errorMiddleware: ${error.stack}`);
    return res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
}

module.exports = errorMiddleware;
