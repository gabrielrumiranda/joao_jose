const faker = require('faker');
const { User } = require('../../models/user');

const default_params = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

export async function create (params = {}) {
  const user = await User.create(Object.assign({}, default_params, params));

  return user;
}