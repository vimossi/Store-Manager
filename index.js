require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const {
  validateName,
  validateQuantity,
} = require('./controllers/middlewares/validate');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);

app.post(
  '/products',
  validateName,
  validateQuantity,
  productController.insert,
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
