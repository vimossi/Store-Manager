const joi = require('joi');

module.exports = (err, _req, res, next) => {
  if (!joi.isError(err)) {
    return next(err);
  }

  const errorMap = {
    'any.required': 400,
    'number.base': 422,
    'number.min': 422,
    'string.base': 422,
    'string.min': 422,
  };

  const status = errorMap[err.details[0].type];

  res.status(status).json({ message: err.details[0].message });
};
