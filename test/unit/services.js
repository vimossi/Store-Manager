const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../models/productModel');
const salesModel = require('../../models/salesModel')
const productService = require('../../services/productService');
const saleService = require('../../services/saleService');

describe('productService', () => {
  describe('"getAll" gets all products from the products table', () => {
    describe('when the table is empty', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(productModel, 'getAll').resolves([]);
        });

        it('is an array', async () => {
          const products = await productService.getAll();
          expect(products).to.be.an('array');
        });

        it('is an empty array', async () => {
          const products = await productService.getAll();
          expect(products).to.be.empty;
        });

        after(() => {
          productModel.getAll.restore();
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

          sinon.stub(productModel, 'getAll').resolves(payload);
        });

        it('is an array', async () => {
          const products = await productService.getAll();
          expect(products).to.be.an('array');
        });

        it('is not empty', async () => {
          const products = await productService.getAll();
          expect(products).to.not.be.empty;
        });

        it('the contents are objects', async () => {
          const products = await productService.getAll();
          products.map((product) => {
            expect(product).to.be.an('object');
          });
        });

        it('the contents have the "id", "name" and "quantity" keys', async () => {
          const result = await productService.getAll();
          result.map((product) => {
            expect(product).to.include.all
              .keys('id', 'name', 'quantity');
          });
        });

        after(() => {
          productModel.getAll.restore();
        });
      });
    });
  });

  describe('"getById" gets the product specified in the request', () => {
    describe('when the specified product exists', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            name: 'Milk',
            quantity: 10,
          };

          sinon.stub(productModel, 'getById').resolves(payload);
        });

        it('is an object', async () => {
          const product = await productService.getById();
          expect(product).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const product = await productService.getById();
          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          productModel.getById.restore();
        });
      });
    });
  });

  describe('"create" inserts a new product into the products table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            name: 'Milk',
            quantity: 10,
          };

          sinon.stub(productModel, 'getByName')
            .resolves(false);

          sinon.stub(productModel, 'create')
            .resolves(payload);
        });

        it('is an object', async () => {
          const product = await productService.create('Milk', 10);
          expect(product).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const product = await productService.create('Milk', 10);
          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });

        it('the "name" matches the request body name', async () => {
          const { name } = await productService.create('Milk', 10);
          expect(name).to.be.equal('Milk');
        });

        it('the "quantity" matches the request body quantity', async () => {
          const { quantity } = await productService.create('Milk', 10);
          expect(quantity).to.be.equal(10);
        });

        after(() => {
          productModel.getByName.restore();
          productModel.create.restore();
        });
      });
    });
  });

  describe('"update" inserts a new sale into the sales table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            name: 'Milk',
            quantity: 10,
          };

          sinon.stub(productModel, 'getById').resolves(payload);
          sinon.stub(productModel, 'update').resolves(payload);
        });

        it('is an object', async () => {
          const result = await productService.update('Milk', 10);
          expect(result).to.be.an('object');
        });

        it('has the "name" and "quantity" keys', async () => {
          const sale = await productService.update('Milk', 10);
          expect(sale).to.include.all
            .keys('name', 'quantity');
        });

        it('"id" matches the request product id', async () => {
          const { id } = await productService.update('Milk', 10);
          expect(id).to.be.equal(1);
        });

        after(() => {
          productModel.getById.restore();
          productModel.update.restore();
        });
      });
    });
  });
});

describe('saleService', () => {
  describe('"getAll" gets all sales from the sales table', () => {
    describe('when the table is empty', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(salesModel, 'getAll').resolves([]);
        });

        it('is an array', async () => {
          const sales = await saleService.getAll();
          expect(sales).to.be.an('array');
        });

        it('is an empty array', async () => {
          const sales = await saleService.getAll();
          expect(sales).to.be.empty;
        });

        after(() => {
          salesModel.getAll.restore();
        });
      });
    });
  });

  describe('when the table is populated', () => {
    describe('the result', () => {
      before(() => {
        const payload = [
          {
            "id": 1,
            "name": "Milk",
            "quantity": 10
          },
          {
            "id": 2,
            "name": "Strawberry Pie",
            "quantity": 5,
          },
        ];

        sinon.stub(salesModel, 'getAll').resolves(payload);
      });

      it('is an array', async () => {
        const sales = await saleService.getAll();
        expect(sales).to.be.an('array');
      });

      it('is not empty', async () => {
        const sales = await saleService.getAll();
        expect(sales).to.not.be.empty;
      });

      it('the contents are objects', async () => {
        const sales = await saleService.getAll();
        sales.map((sale) => {
          expect(sale).to.be.an('object');
        });
      });

      it('the contents have the "id", "name" and "quantity" keys', async () => {
        const sales = await saleService.getAll();
        sales.map((sale) => {
          expect(sale).to.include.all
            .keys('id', 'name', 'quantity');
        });
      });

      after(() => {
        salesModel.getAll.restore();
      });
    });
  });

  describe('"getById" gets the sale specified in the request', () => {
    describe('when the specified sale exists', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            name: 'Milk',
            quantity: 10,
          };

          sinon.stub(salesModel, 'getById').resolves(payload);
        });

        it('is an object', async () => {
          const sale = await saleService.getById();
          expect(sale).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const sale = await saleService.getById();
          expect(sale).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          salesModel.getById.restore();
        });
      });
    });
  });

  describe('"create" inserts a new sale into the sales table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            itemsSold: [
              {
                product_id: 1,
                quantity: 2
              },
              {
                product_id: 2,
                quantity: 5
              },
            ],
          };

          sinon.stub(salesModel, 'create').resolves(payload);
        });

        it('is an object', async () => {
          const result = await saleService.create([]);
          expect(result).to.be.an('object');
        });

        it('has the "id" and "itemsSold" keys', async () => {
          const sale = await saleService.create([]);
          expect(sale).to.include.all
            .keys('id', 'itemsSold');
        });

        it('"itemsSold" is an array', async () => {
          const { itemsSold } = await saleService.create([]);
          expect(itemsSold).to.be.an('array');
        });

        it('the contents are objects', async () => {
          const { itemsSold } = await saleService.create([]);
          itemsSold.map((sale) => {
            expect(sale).to.be.an('object');
          });
        });

        it('the contents have the "product_id" and "quantity" keys', async () => {
          const { itemsSold } = await saleService.create([]);
          itemsSold.map((sale) => {
            expect(sale).to.include.all
              .keys('product_id', 'quantity');
          });
        });

        after(() => {
          salesModel.create.restore();
        });
      });
    });
  });

  describe('"update" inserts a new sale into the sales table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            saleId: 1,
            itemUpdated: [
              {
                product_id: 1,
                quantity: 2
              },
              {
                product_id: 2,
                quantity: 5
              },
            ],
          };

          sinon.stub(salesModel, 'getById').resolves([{ a: 1 }]);
          sinon.stub(salesModel, 'update').resolves(payload);
        });

        it('is an object', async () => {
          const result = await saleService.update(1, []);
          expect(result).to.be.an('object');
        });

        it('has the "saleId" and "itemUpdated" keys', async () => {
          const sale = await saleService.update(1, []);
          expect(sale).to.include.all
            .keys('saleId', 'itemUpdated');
        });

        it('"itemUpdated" is an array', async () => {
          const { itemUpdated } = await saleService.update(1, []);
          expect(itemUpdated).to.be.an('array');
        });

        it('the contents are objects', async () => {
          const { itemUpdated } = await saleService.update(1, []);
          itemUpdated.map((sale) => {
            expect(sale).to.be.an('object');
          });
        });

        after(() => {
          salesModel.getById.restore();
          salesModel.update.restore();
        });
      });
    });
  });
});
