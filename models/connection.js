/* eslint-disable no-console */
const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

let connect;

module.exports = async () => {
  /* Se já estiver conectado não roda toda a
  função novamente */
  if (connect) return Promise.resolve(connect);
  try {
    const session = await mysqlx.getSession({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      schema: 'cep_lookup',
    });
    connect = await session.getSchema('cep_lookup');
    return connect;
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
};
