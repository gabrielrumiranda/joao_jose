const faker = require('faker');
const { Book } = require('../../models');

const default_params = {
  name: faker.name.title(),
  author: faker.name.findName(),
  score: faker.random.number(5),
  status: faker.random.arrayElement(['reading', 'readed', 'readList']),
  link: faker.internet.url(),
  pagesNumber: faker.random.number({min:150, max:300}),
  lastPageRead: faker.random.number({min:0, max:150}),
};

export async function create (params = {}) {
  const book = await Book.create(Object.assign({}, default_params, params));
  return book;
}