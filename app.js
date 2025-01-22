const cors = require('cors');
const express = require('express');
const parser = require('body-parser');
const orders = require('./src/routes/orders');
const imageGenerator = require('./src/routes/imageGenerator');

require('./src/mongo');

const app = express();
const port = process.env.PORT || 4000;

app.set('port', port);
app.use(cors());
app.use(parser.json({ extended: true }));
app.use('/', express.static('./public'));

app.use('/orders', orders);
app.use('/imageGenerator', imageGenerator);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get('/', async (req, res) => {
  res.json({ status: 'healthy' });
});

app.all('*', (req, res) => {
  res.status(404).json({ result: 'Failure', error: 'Bad Route' });
});
