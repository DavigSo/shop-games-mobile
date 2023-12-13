// httpService.js
import axios from 'axios';

const httpService = axios.create({
  baseURL: 'http://10.5.0.166:8000/api', // Substitua pela sua base URL
  timeout: 5000, // Tempo limite em milissegundos
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros cabeçalhos, se necessário
  },
});

export default httpService;
