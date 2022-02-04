const products = require('express').Router();
const rescue = require('express-rescue');

const {
  getAll,
  getById,
  create,
  update,
  remove,
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

products.put('/:id', rescue(async (req, res) => {
  validateProduct(req.body);

  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await update(id, name, quantity);

  res.status(200).json(updatedProduct);
}));

products.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await remove(id);

  res.status(200).json(deletedProduct);
}));

module.exports = products;
