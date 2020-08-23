/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const cepController = require('./controllers/cepController');

const app = express();
const port = process.env.APP_PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', './views/');

app.get('/', cepController.lookupCEP);
app.listen(port, () => console.log(`Ouvindo porta ${port}`));
