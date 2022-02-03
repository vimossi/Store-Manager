const productModel = require('../models/productModel'); 

async function insert(name, quantity) {
  const newProduct = await productModel.insert(name, quantity);
  return newProduct;
}

async function getAll() {
  const getAllProduct = await productModel.getAll();
  return getAllProduct;
}

module.exports = {
  insert,
  getAll,
};