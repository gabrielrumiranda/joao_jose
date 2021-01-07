import { User } from '../models';

exports.create = async(userData) => {
  console.log(userData);
  console.log('teste');
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (!existingUser) {
    try {
      const newUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err };
    }
  } else {
    return { success: false, error: ['User already exists'] };
  }
};
