const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../models/connection');
const { getAll } = require('../../models/productsModel');

describe('"getAll" gets all products from the products table', () => {
  describe('when the table is empty', () => {
    describe('the result', () => {
      before(() => {
        sinon.stub(connection, 'execute')
          .resolves([[]]);
      });

      it('is an array', async () => {
        const result = await getAll();
        expect(result).to.be.an('array');
      });

      it('is an empty array', async () => {
        const result = await productModel.getAll();
        expect(result).to.be.empty;
      });

      after(() => {
        connection.execute.restore();
      });
    });
  });

  describe('when the table is populated', () => {
    describe('the result', () => {
      before(() => {
        const payload = [
          {
            id: 1,
            name: 'Milk',
            quantity: 10,
          },
          {
            id: 2,
            name: 'Strawberry Pie',
            quantity: 5,
          },
        ];

        sinon.stub(connection, 'execute')
          .resolves([[payload]]);
      });

      it('is an array', async () => {
        const result = await getAll();
        expect(result).to.be.an('array');
      });

      it('is not empty', async () => {
        const result = await getAll();
        expect(result).to.not.be.empty;
      });

      it('the products are objects', async () => {
        const result = await getAll();
        result.map((product) => {
          expect(product).to.be.an('object');
        });
      });

      it('the products have the "id", "name" and "quantity" keys', async () => {
        const result = await getAll();
        result.map((product) => {
          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });
      });
    });
  });
});