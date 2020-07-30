const db = require('../config/database');

export async function getAllUsers() {
  return await db.query('SELECT * FROM users;');
}

export async function getUserById(userId) {
  return ( 
    await db.query('SELECT * FROM users WHERE id = $1', [userId])
  );
}

export async function getUserByName(userName) {
  return ( 
    await db.query('SELECT * FROM users WHERE name = $1', [userName])[0]
  );
}

export async function createUser(user) {
  return (db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [user.name, user.email, user.password])
  );
}

export async function deleteUserById(userId) {
  await db.query('DELETE FROM users WHERE userId = $1', [
    userId
  ]);
}