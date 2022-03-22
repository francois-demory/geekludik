const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Author extends Model {}

Author.init({
    author_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'author'
});

module.exports = Author;