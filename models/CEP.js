const connection = require('./connection.js');
const cepAPI = require('../services/cepAPI');

/* regex e função para salvar CEP baseada
em gabarito obtido em  https://course.betrybe.
com/back-end/architecture/mvc/part-1/solutions */
const validateCEP = (cep) => cep && cep.match(/^\d{5}-?\d{3}$/);

const saveCEP = async (data) => {
  const { cep, uf, cidade, bairro, logradouro } = data;
  try {
    const db = await connection();
    const dbUpdate = await db
      .getTables('ceps')
      .insert(['cep', 'uf', 'cidade', 'bairro', 'logradouro'])
      .values(cep, uf, cidade, bairro, logradouro)
      .execute();
    return dbUpdate;
  } catch (error) {
    return error;
  }
};

const findCEP = async (cep) => {
  try {
    const db = await connection();
    const searchCep = await db
      .getTable('ceps')
      .select('uf', 'cidade', 'bairro', 'logradouro')
      .where('cep = :cep')
      .bind('cep', cep)
      .execute();

    const cepData = await searchCep.fetchAll();
    if (!cepData) return null;

    const [uf, cidade, bairro, logradouro] = cepData;

    return { uf, cidade, bairro, logradouro };
  } catch (error) {
    return error;
  }
};

module.exports = async (cep) => {
  if (!validateCEP(cep)) throw new Error('CEP inválido');
  try {
    const cepData = await findCEP(cep);

    if (cepData) return cepData;

    const data = await cepAPI(cep);
    await saveCEP(data);
    return data;
  } catch (error) {
    return error;
  }
};
