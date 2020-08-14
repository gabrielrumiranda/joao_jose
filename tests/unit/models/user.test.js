const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');

const { expect } = require('chai')

const UserModel = require('../../../models/user');
const bookModel = require('../../../models/book');

describe('src/models/User', () => {
  const User = UserModel(sequelize, dataTypes);
  const Book = bookModel(sequelize, dataTypes);

  const user = new User();

  checkModelName(User)('User');

  context('properties', () => {
    ['name', 'email', 'password'].forEach(
      checkPropertyExists(user)
    );
  });
  
  context('associations', () => {
    const Book = 'some dummy book'

    before(() => {
      User.associate({ Book })
    }) 
    it('defined a hasMany association with User as \'books\'', () => {
      expect(User.hasMany).to.have.been.calledWith(Book, {
        as: 'books',
        foreignKey: 'bookId'
      });
    });
  });
});