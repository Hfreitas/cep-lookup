const axios = require('axios');

const api = axios.create({
  baseURL: 'http://cep.la/',
  headers: { Accept: 'application/json' },
});

module.exports = async (cep) => {
  try {
    const response = await api.get(encodeURIComponent(cep));
    const data = await response.data;
    if (Array.isArray(data) && data.length === 0)
      throw new Error('CEP não encontrado');
    return data;
  } catch (error) {
    return error;
  }
};
