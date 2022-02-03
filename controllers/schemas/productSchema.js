const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required().messages({
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'number.min': '"quantity" must be a number larger than or equal to 1',
  }),
});

const validateProduct = (body) => {
  const { error } = productSchema.validate(body);
  if (error) throw error;
};

module.exports = validateProduct;
