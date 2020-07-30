import bcrypt from 'bcryptjs';
import { createUser } from '../queries/user';

export async function signup(request) {
  const user = request.body;
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);
  delete user.password;
  user.password = hash;

  return createUser(user);
}

