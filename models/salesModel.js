const connection = require('./connection');

const salesTable = 'StoreManager.sales';
const joinedTable = 'StoreManager.sales_products';

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM ${salesTable}
    JOIN ${joinedTable}
    ON (${salesTable}.id = ${joinedTable}.sale_id)`,
  );

  return sales;
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales
    JOIN StoreManager.sales_products
    ON (StoreManager.sales.id = StoreManager.sales_products.sale_id)
    WHERE sale_id = ?`,
    [saleId],
  );

  return sale;
};

const create = async () => {
  const [newSale] = await connection.execute(
    `INSERT INTO ${salesTable} (date) VALUES (NOW())`,
  );

  return newSale.insertId;
};

const sell = async (saleId, productId, quantity) => {
  await connection.execute(
    `INSERT INTO ${joinedTable} (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  );
};

module.exports = {
  getAll,
  getById,
  create,
  sell,
};
