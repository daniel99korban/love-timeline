import axios from 'axios';

const api = axios.create({
  baseURL: 'https://website-generator-backend-g3xs.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export default api;