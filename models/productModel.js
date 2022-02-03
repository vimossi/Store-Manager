const connection = require('./connection');

async function getAll() {
  const [products] = await connection.execute('SELECT * FROM products');
  
  return products;
}

async function create({ name, quantity }) {
  const [newProduct] = await connection.execute(
      'INSERT INTO products VALUES (?, ?)', [name, quantity],
  );

  return {
      id: newProduct.insertId,
      name,
      quantity,
  };
}

module.exports = {
  create,
  getAll,
};
