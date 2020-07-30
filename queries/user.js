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
    await db.query('SELECT * FROM users WHERE name = $1 LIMIT 1', [userName])
  );
}

export async function createUser(user) {
  return (db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [user.name, user.email, user.password])
  );
}

export async function deleteUserById(userId) {
  await db.query('DELETE FROM users WHERE userId = $1', [
    userId
  ]);
}