const productService = require('../services/productService');

const insert = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.insert({ name, quantity });

  res.status(201).json(newProduct);
};

module.exports = {
  insert,
};
