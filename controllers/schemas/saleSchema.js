const joi = require('joi');

const idKey = 'product_id';

const saleSchema = joi.array().items(joi.object({
  [idKey]: joi.number().min(1).required().messages({
    'number.base': '"product_id" must be a number larger than or equal to 1',
    'number.min': '"product_id" must be a number larger than or equal to 1',
    'any.required': '"product_id" is required',
  }),
  quantity: joi.number().min(1).required().messages({
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'any.required': '"quantity" is required',
  }),
}));

const validateSale = (body) => {
  const { error } = saleSchema.validate(body);
  if (error) throw error;
};

module.exports = validateSale;
