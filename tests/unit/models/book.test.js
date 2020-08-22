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

  context('validator', async () => {
    await bookFactory.create({pagesNumber: 2, lastPageRead:1}).catch((error) => console.log(error));
  });
});