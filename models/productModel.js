const connection = require('./connection');
const NotFoundError = require('../errors/notFound');

async function getAll() {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );

  return products;
}

async function getById(id) {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (product.length <= 0) throw new NotFoundError();

  return product[0];
}

async function getByName(name) {
  const [product] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return product[0];
}

async function create(name, quantity) {
  const [newProduct] = await connection.execute(
      'INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity],
  );

  return {
      id: newProduct.insertId,
      name,
      quantity,
  };
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
};
