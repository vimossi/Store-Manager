const productModel = require('../models/productModel'); 

const insert = async (name, quantity) => productModel.insert(name, quantity);

module.exports = {
  insert,
};