const productModel = require('../models/productModel');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/notFound');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) throw new NotFoundError('Product not found');
  return product;
};

const create = async (name, quantity) => {
  const exists = await productModel.getByName(name);
  if (exists) throw new ConflictError('Product already exists');

  const newProduct = await productModel.create(name, quantity);
  return newProduct;
};

const update = async (id, name, quantity) => {
  const product = await productModel.getById(id);
  if (!product) throw new NotFoundError('Product not found');

  const updatedProduct = await productModel.update(
    id,
    name,
    quantity,
  );

  return updatedProduct;
};

const remove = async (id) => {
  const product = await productModel.getById(id);
  if (!product) throw new NotFoundError('Product not found');

  await productModel.remove(id);

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
