const sales = require('express').Router();
const rescue = require('express-rescue');

const validateSale = require('./schemas/saleSchema');

const {
  getAll,
  getById,
  create,
} = require('../services/saleService');

sales.get('/', rescue(async (req, res) => {
  const result = await getAll();

  res.status(200).json(result);
}));

sales.get('/:id', rescue(async (req, res) => {
  const { id: saleId } = req.params;
  const sale = await getById(saleId);

  res.status(200).json(sale);
}));

sales.post('/', rescue(async (req, res) => {
  const { body: items } = req;
  validateSale(items);

  const newSale = await create(items);
  res.status(201).json(newSale);
}));

module.exports = sales;
