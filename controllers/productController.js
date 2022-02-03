const products = require('express').Router();
const rescue = require('express-rescue');

const productService = require('../services/productService');

products.get('/', rescue(async (req, res) => {
  const result = await productService.getAll();

  res.status(200).json(result);
}));

module.exports = products;
