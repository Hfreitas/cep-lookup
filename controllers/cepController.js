const CEP = require('../models/CEP');

const lookupCEP = async (req, res) => {
  const { cep } = req.query;
  try {
    const payload = await CEP(cep);
    return res.render('cep', { cep: payload, message: null });
  } catch (error) {
    return res.render('cep', { cep: null, message: error.message });
  }
};

module.exports = { lookupCEP };
