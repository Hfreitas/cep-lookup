/* eslint-disable no-console */
const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

module.exports = async () => {
  try {
    const session = await mysqlx.getSession({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      schema: 'cep_lookup',
    });
    return session.getSchema('cep_lookup');
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
};
