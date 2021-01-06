const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
  checkHookDefined
} = require('sequelize-test-helpers');

const { expect } = require('chai');
const bcrypt = require('bcryptjs');

const UserModel = require('../../../models/user');
const UserFactory = require ('../../factory/user');

describe('src/models/User', () => {
  const User = UserModel(sequelize, dataTypes);

  const user = new User();

  checkModelName(User)('User');

  context('properties', () => {
    ['name', 'email', 'password'].forEach(
      checkPropertyExists(user)
    );
  });

  context('hooks', () => {
    ['beforeCreate'].forEach(
      checkHookDefined(user)
    );

    context('When values are valid', () => {
      it('the password is saved encrypted', async () => {
        const password = 'password';
        const dummyUser = await UserFactory.create({password: password});
        const validPassword = await bcrypt.compare(password, dummyUser.password);
        expect(validPassword).is.equal(true);
      });
    });
  });
  
  context('associations', () => {
    const Book = 'some dummy book';

    before(() => {
      User.associate({ Book });
    }); 
    it('defined a hasMany association with User as \'books\'', () => {
      expect(User.hasMany).to.have.been.calledWith(Book, {
        as: 'books', 
        foreignKey: 'userId'
      });
    });
  });
});