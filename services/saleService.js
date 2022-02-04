const salesModel = require('../models/salesModel');
const NotFoundError = require('../errors/notFound');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length <= 0) throw new NotFoundError('Sale not found');

  return sale;
};

const create = async (items) => {
  const saleId = await salesModel.create();

  await Promise.all(items.map(async (item) => {
    const idKey = 'product_id';
    const { [idKey]: productId, quantity } = item;
    await salesModel.sell(saleId, productId, quantity);
  }));

  return {
    id: saleId,
    itemsSold: items,
  };
};

const update = async (saleId, newId, newQuantity) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length <= 0) throw new NotFoundError('Sale not found');

  const updatedProduct = await salesModel.update(
    saleId,
    newId,
    newQuantity,
  );

  return updatedProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
