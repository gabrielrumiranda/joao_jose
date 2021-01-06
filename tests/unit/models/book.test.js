const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');

const { expect } = require('chai');
const BookModel = require('../../../models/book');
const bookFactory = require('../../factory/book');

describe('src/models/User', () => {
  const Book = BookModel(sequelize, dataTypes);

  const book = new Book();

  checkModelName(Book)('Book');

  context('properties', () => {
    ['name', 'author', 'score', 'status', 'link', 'pagesNumber', 'lastPageRead'].forEach(
      checkPropertyExists(book)
    );
  });
  
  context('associations', () => {
    const User = 'user';

    before(() => {
      Book.associate({ User });
    }); 

    it('defined a belongsTo association with User', () => {
      expect(Book.belongsTo).to.have.been.calledWith(User);
    });
  });

  context('validator', () => {
    context('lastPageRead', () => {
      context('lastPageInPageNumber', () => {
        it('When last page read is less then number of page', async () => {
          expect(async () => {
            await bookFactory.create({pagesNumber: 100, lastPageRead:10});
          }).to.not.throw();
        });

        it('When last page read is bigger then number of page', async () => {
          try {
            await bookFactory.create({pagesNumber: 2, lastPageRead:10});
          } catch (error) {
            expect(error).to.be.an.instanceOf(Error).with.property('name', 'SequelizeValidationError');
          }
        });
      });
    });   
  });
});