const sales = require('express').Router();
const rescue = require('express-rescue');

const validateSale = require('./schemas/saleSchema');

const {
  getAll,
  getById,
  create,
  update,
} = require('../services/saleService');

sales.get('/', rescue(async (_req, res, _next) => {
  const result = await getAll();
  res.status(200).json(result);
}));

sales.get('/:id', rescue(async (req, res, _next) => {
  const { id: saleId } = req.params;
  const sale = await getById(saleId);

  res.status(200).json(sale);
}));

sales.post('/', rescue(async (req, res, _next) => {
  const { body: items } = req;
  validateSale(items);

  const newSale = await create(items);
  res.status(201).json(newSale);
}));

sales.put('/:id', rescue(async (req, res, _next) => {
  const {
    body: updatedItems,
    params: {
      id: saleId,
    },
  } = req;

  validateSale(updatedItems);

  const updatedSale = await update(saleId, updatedItems);
  res.status(200).json(updatedSale);
}));

module.exports = sales;
