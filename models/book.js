module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    author: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    score: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['reading', 'readed', 'readList']],
      }
    },
    link: {
      allowNull: true,  
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    pagesNumber: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    lastPageRead: {
      allowNull: true,
      type: DataTypes.INTEGER,
      validate: {
        lastPageInPageNumber() {
          if (this.pagesNumber < this.lastPageRead ) {
            throw new Error('The last page read must be less than the total pages');
          }
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Book;
};