require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const {
  joiError,
  domainError,
  error,
} = require('./controllers/middlewares');

// const {
//   validateName,
//   validateQuantity,
// } = require('./controllers/middlewares/validate');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

/* Rotas */ 
app.use('/products', productController);

// app.post(
//   '/products',
//   validateName,
//   validateQuantity,
//   productController.insert,
// );

/* Erros Middleware */
app.use(joiError);
app.use(domainError);
app.use(error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
