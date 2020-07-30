const bcrypt = require('bcryptjs');

function comparePass(userPassword, dataBasePassword) {
  return bcrypt.compareSync(userPassword, dataBasePassword);
}

module.exports = {
  comparePass
};