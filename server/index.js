const express = require('express');
const app = express();
const port = 3000;

const routes = require('./routes.js');

// * App-Level Middleware * //

// Built-In Middleware

app.use(express.json());

// Custom Middleware

// app.use((req, res, next) => {
//   next();
// })

// * Routes * //

app.use('/api/products', routes);

// * Start * //

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})
