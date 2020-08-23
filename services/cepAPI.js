const axios = require('axios');

const api = axios.create({
  baseURL: 'http://cep.la/',
  headers: { Accept: 'application/json' },
});

module.exports = async (cep) => {
  try {
    const response = await api.get(encodeURIComponent(cep));
    return response.data;
  } catch (error) {
    return error;
  }
};
