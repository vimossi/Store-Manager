const connection = require('./connection');

const insert = async ({ name, quantity }) => {
  const [products] = await connection.query(
      'INSERT INTO products VALUES (?, ?)', [name, quantity],
      );

  return {
      id: products.insertId,
      name,
      quantity,
  };
};

module.exports = {
  insert,
};
