import axios from 'axios';

const api = axios.create({
  baseUrl: 'http://10.5.0.166:8000',
});

export default api;
