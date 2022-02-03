const productModel = require('../models/productModel');
const ConflictError = require('./errors/conflict');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const getByName = async (name) => {
  const product = await productModel.getByName(name);
  return product;
};

const create = async (name, quantity) => {
  const exists = await getByName(name);
  if (exists) throw new ConflictError();

  const newProduct = await productModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  create,
};
