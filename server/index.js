const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

const routes = require('./routes.js');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'testing', 'loader.io')));

app.use('/api/products', routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})
