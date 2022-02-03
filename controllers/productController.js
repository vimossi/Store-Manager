const products = require('express').Router();
const rescue = require('express-rescue');

const {
  getAll,
  getById,
  create,
} = require('../services/productService');
const validateProduct = require('./schemas/productSchema');

products.get('/', rescue(async (req, res) => {
  const result = await getAll();
  res.status(200).json(result);
}));

products.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const product = await getById(id);

  res.status(200).json(product);
}));

products.post('/', rescue(async (req, res) => {
  validateProduct(req.body);

  const { name, quantity } = req.body;
  const newProduct = await create(name, quantity);

  res.status(201).json(newProduct);
}));

module.exports = products;
