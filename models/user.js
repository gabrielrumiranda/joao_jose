const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(user.password, 10, null);
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.associate = (models) => {
    User.hasMany(models.Book, {
      foreignKey: 'userId',
      as: 'books'
    });
  };

  return User;
};